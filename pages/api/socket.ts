import { Server as NetServer, Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces/socket';
import { Member } from '../../interfaces/member';
import { Room } from '@/class/room';
import { Rooms } from '@/class/rooms';
import { Table } from '@/class/table';
import { Card } from '@/class/card';
import { User } from '@/class/user';
import { Cards } from '@/class/cards';

type NextApiResponseSocketIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseSocketIO) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
      res.socket.server as any,
    );
    const rooms: Rooms = new Rooms();

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
        if (!roomSocketIds.find((v) => v === member.id)) return; // 退出済みのメンバーのカードは破棄
        if (member.selectedCard !== null) {
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
      room.members.forEach((member) => {
        member.selectedCard = null;
      });
    };

    io.on('connection', (socket) => {
      socket.on('join-room', (roomId) => {
        socket.join(roomId);

        let room: Room | undefined = rooms.findRoom(roomId);
        if (!room) {
          room = new Room(roomId);
          rooms.addRoom(room);
        }

        room.getTable().addCard(new Card(socket.id, null));

        io.to(roomId).emit('update-room', room);
        io.to(socket.id).emit('update-user', new User(socket.id));
      });

      socket.on('change-deck-type', (roomId, newDeckType) => {
        const room: Room | undefined = rooms.findRoom(roomId);
        if (!room) return;

        room.setDeckType(newDeckType);
        room.getTable().getCards().clearCards();

        io.to(roomId).emit('update-room', room);
      });

      socket.on('put-down-a-card', (roomId, newValue: string | number | null) => {
        const room: Room | undefined = rooms.findRoom(roomId);
        if (!room) return;

        const playersCard: Card = room.getTable().getCards().findCardByPlayerId(socket.id);
        playersCard.setValue(newValue);

        io.to(roomId).emit('update-room', room);
      });

      socket.on('open-cards', (roomId) => {
        const room: Room | undefined = rooms.find((v) => v.id === roomId);
        if (!room) return;
        if (!room.members.find((v) => v.selectedCard !== null)) return;
        room.cardsAreOpen = true;
        io.to(roomId).emit('update-cards-are-open', true);
      });

      socket.on('replay', (roomId) => {
        const room: Room | undefined = rooms.find((v) => v.id === roomId);
        if (!room) return;
        clearCards(roomId);
        room.cardsAreOpen = false;
        io.to(roomId).emit('update-cards-are-open', room.cardsAreOpen);
        io.to(roomId).emit('update-members', room.members);
      });

      socket.on('change-member-type', (roomId, memberType) => {
        const room: Room | undefined = rooms.find((v) => v.id === roomId);
        if (!room) return;
        const member: Member | undefined = room.members.find((v) => v.id === socket.id);
        if (!member) return;
        member.type = memberType;
        member.selectedCard = null;
        cleanRoom(roomId);
        io.to(roomId).emit('update-members', room.members);
      });

      socket.on('nominate', (memberId) => {
        io.to(memberId).emit('nominate');
      });

      socket.on('disconnecting', () => {
        socket.rooms.forEach((roomId) => {
          const room: Room | undefined = rooms.findRoom(roomId);
          if (!room) return;
          const cards: Cards = room.getTable().getCards();
          cards.removeCardByPlayerId(socket.id);
          if (!cards.areCardsExist) {
            rooms.removeRoom(roomId);
          } else {
            io.to(roomId).emit('update-room', room);
          }
        });
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
