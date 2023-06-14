import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as SocketIOServer } from 'socket.io';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard } from '@/class/tableCard';
import { User } from '@/class/user';

// interface
import { ClientToServerEvents, ServerToClientEvents } from '@/interfaces/socket';
import { Member } from '../../interfaces/member';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

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
    const rooms: Room[] = [];
    const users: User[] = [];

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

    const findRoomById = (roomId: string): Room | undefined => {
      return rooms.find((room: Room) => room.getId() === roomId);
    };

    io.on('connection', (socket) => {
      socket.on('join-room', (roomId) => {
        socket.join(roomId);

        let room: Room | undefined = findRoomById(roomId);
        if (!room) {
          room = new Room(roomId);
          rooms.push(room);
        }

        room.getTable().addCard(new TableCard(socket.id, null));

        const user: User = new User(socket.id, 'player', null);
        users.push(user);

        io.to(roomId).emit('update-room', room);
        io.to(socket.id).emit('update-user', user);
      });

      socket.on('change-deck-type', (roomId, newDeckType) => {
        const room: Room | undefined = findRoomById(roomId);
        if (!room) return;

        room.setDeckType(newDeckType);
        room.getTable().clearCards();

        io.to(roomId).emit('update-room', room);
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

      socket.on('put-down-a-card', (roomId, newValue: IFTableCardValue) => {
        const room: Room | undefined = findRoomById(roomId);
        if (!room) return;

        const table: Table = room.getTable();
        const tableCards: TableCard[] = table.getCards();
        const playerCard: TableCard | undefined = tableCards.find(
          (tableCard: TableCard) => tableCard.getPlayerId() === socket.id,
        );
        if (!playerCard) return;

        playerCard.setValue(newValue);
        table.rearrangeCards();

        io.to(roomId).emit('update-room', room);

        const user: User | undefined = users.find((user: User) => user.getId() === socket.id);
        if (!user) return;
        user.setSelectedCardValue(newValue);

        io.to(socket.id).emit('update-user', user);
      });

      socket.on('open-cards', (roomId) => {
        const room: Room | undefined = findRoomById(roomId);
        if (!room) return;

        const table: Table = room.getTable();
        if (table.areOnlyBlankCardsExist()) return;

        table.openCards();

        io.to(roomId).emit('update-room', room);
      });

      socket.on('replay', (roomId) => {
        const room: Room | undefined = findRoomById(roomId);
        if (!room) return;

        const table: Table = room.getTable();
        table.closeCards();
        table.clearCards();

        io.to(roomId).emit('update-room', room);
      });

      socket.on('nominate', (memberId) => {
        io.to(memberId).emit('nominate');
      });

      socket.on('disconnecting', () => {
        socket.rooms.forEach((roomId) => {
          const room: Room | undefined = rooms.find((room: Room) => room.getId() === roomId);
          if (!room) return;

          const table: Table = room.getTable();
          table.removeCardByPlayerId(socket.id);

          if (!table.areCardsExist()) {
            const removeRoomIndex: number = rooms.findIndex(
              (room: Room) => room.getId() === roomId,
            );
            rooms.splice(removeRoomIndex, 1);
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
