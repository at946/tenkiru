import { Server as NetServer, Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Room } from '../../interfaces/room';
import { Member } from '../../interfaces/member';
import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces/socket';

type NextApiResponseSocketIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseSocketIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running.');
  } else {
    console.log('Socket is initializing');

    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
      res.socket.server as any,
    );
    const rooms: Room[] = [];

    const cleanRoom = (roomId: string): void => {
      // roomsと接続中のソケット情報を使って、現在のルームの状況を整理する
      // - すでにdisconnectしたメンバーの削除
      // - カード選択状況に応じたメンバーの並び替え
      let room: Room | undefined = rooms.find((v) => v.id === roomId);
      if (!room) return;
      const members: Member[] = room.members;
      const newMembers: Member[] = [];
      const roomSocketIds: string[] = Array.from(io.of('/').adapter.rooms.get(roomId) || new Set());

      members.forEach((member) => {
        if (!roomSocketIds.find((v) => v === member.id)) return;
        if (!!member.card) {
          newMembers.unshift(member);
        } else {
          newMembers.push(member);
        }
      });

      room.members = newMembers;
    };

    const clearCards = (roomId: string): void => {
      // ルームメンバーのカードをすべて初期化する
      let room: Room | undefined = rooms.find((v) => v.id === roomId);
      if (!room) return;
      const members: Member[] = room.members;
      members.forEach((member) => {
        member.card = null;
      });
    };

    io.on('connection', (socket) => {
      socket.on('join-room', (roomId) => {
        socket.join(roomId);
        const newMember: Member = { id: socket.id, type: 'player', card: null };
        const room: Room | undefined = rooms.find((v) => v.id === roomId);
        if (!room) {
          const newRoom: Room = { id: roomId, members: [newMember], cardsAreOpen: false };
          rooms.push(newRoom);
          io.to(roomId).emit('update-members', newRoom.members);
        } else {
          room.members.push(newMember);
          cleanRoom(roomId);
          io.to(roomId).emit('update-members', room.members);
          io.to(roomId).emit('update-cards-are-open', room.cardsAreOpen);
        }
      });

      socket.on('put-down-a-card', (roomId, card) => {
        const room: Room | undefined = rooms.find((v) => v.id === roomId);
        if (!room) return;
        const member: Member | undefined = room.members.find((v) => v.id === socket.id);
        if (!member) return;
        member.card = card;
        cleanRoom(roomId);
        io.to(roomId).emit('update-members', room.members);
      });

      socket.on('open-cards', (roomId) => {
        const room: Room | undefined = rooms.find((v) => v.id === roomId);
        if (!room) return;
        if (!room.members.find((v) => v.card !== null)) return;
        room.cardsAreOpen = true;
        io.to(roomId).emit('update-cards-are-open', true);
      });

      socket.on('clear-cards', (roomId) => {
        clearCards(roomId);
        const room: Room | undefined = rooms.find((v) => v.id === roomId);
        if (!room) return;
        room.cardsAreOpen = false;
        io.to(roomId).emit('update-cards-are-open', false);
        io.to(roomId).emit('update-members', room.members);
      });

      socket.on('change-member-type', (roomId, memberType) => {
        const room: Room | undefined = rooms.find((v) => v.id === roomId);
        if (!room) return;
        const member: Member | undefined = room.members.find((v) => v.id === socket.id);
        if (!member) return;
        member.type = memberType;
        member.card = null;
        cleanRoom(roomId);
        io.to(roomId).emit('update-members', room.members);
      });

      socket.on('disconnecting', () => {
        socket.rooms.forEach((roomId) => {
          const room: Room | undefined = rooms.find((v) => v.id === roomId);
          if (!room) return;
          const memberIndex = room.members.findIndex((v) => v.id === socket.id);
          if (memberIndex < 0) return;
          room.members.splice(memberIndex, 1);
          if (room.members.length === 0) {
            const roomIndex = rooms.findIndex((v) => v.id === room.id);
            rooms.splice(roomIndex, 1);
          } else {
            io.to(roomId).emit('update-members', room.members);
          }
        });
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
