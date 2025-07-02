import type { Http2Server } from 'node:http2';
import type { Socket } from 'node:net';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { Room } from '@/class/room';
import { User } from '@/class/user';
import type { IFDeckType } from '@/interfaces/deckType';
import type { IFClientToServerEvents, IFServerToClientEvents } from '@/interfaces/socket';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import type { IFUserType } from '@/interfaces/userType';
import { findRoomById } from './utils/findRoomById';

type NextApiResponseSocketIO = NextApiResponse & {
  socket: Socket & {
    server: Http2Server & {
      io: Server;
    };
  };
};

const SocketHandler = (_req: NextApiRequest, res: NextApiResponseSocketIO) => {
  if (!res.socket.server.io) {
    const io = new Server<IFClientToServerEvents, IFServerToClientEvents>(res.socket.server);
    const rooms: Room[] = [];

    const removeRoomById = (roomId: string): void => {
      const removeRoomIndex: number = rooms.findIndex((room: Room) => room.getId() === roomId);
      rooms.splice(removeRoomIndex, 1);
    };

    io.on('connection', (socket) => {
      socket.on('join-room', (roomId: string): void => {
        let room: Room | undefined = findRoomById({
          rooms: rooms,
          roomId: roomId,
        });
        if (!room) {
          room = new Room(roomId);
          rooms.push(room);
        }
        socket.join(roomId);
        room.addUser(new User(socket.id));

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('change-deck-type', (roomId: string, newDeckType: IFDeckType): void => {
        const room: Room | undefined = findRoomById({
          rooms: rooms,
          roomId: roomId,
        });
        if (!room) return;

        room.setDeckType(newDeckType);
        room.resetCards();

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('change-user-type', (roomId: string, newUserType: IFUserType): void => {
        const room: Room | undefined = findRoomById({
          rooms: rooms,
          roomId: roomId,
        });
        if (!room) return;

        const user: User | undefined = room.findUserById(socket.id);
        if (!user) return;

        user.setType(newUserType);
        user.resetCard();
        room.reorderUser(user.getId());

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('select-card', (roomId: string, selectedCardValue: IFTableCardValue): void => {
        const room: Room | undefined = findRoomById({
          rooms: rooms,
          roomId: roomId,
        });
        if (!room) return;

        const user: User | undefined = room.findUserById(socket.id);
        if (!user) return;

        user.selectCard(selectedCardValue);
        room.reorderUser(user.getId());

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('open-cards', (roomId: string): void => {
        const room: Room | undefined = findRoomById({
          rooms: rooms,
          roomId: roomId,
        });
        if (!room) return;

        room.openCards();

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('request-to-select', (roomId: string) => {
        const room: Room | undefined = findRoomById({
          rooms: rooms,
          roomId: roomId,
        });
        if (!room) return;

        const players: User[] = room.getPlayersNotSelectCard();

        for (const player of players) {
          io.to(player.getId()).emit('receive-request-to-select');
        }
      });

      socket.on('replay', (roomId: string): void => {
        const room: Room | undefined = findRoomById({
          rooms: rooms,
          roomId: roomId,
        });
        if (!room) return;

        room.replay();

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('nominate', (memberId: string): void => {
        io.to(memberId).emit('nominate');
      });

      socket.on('disconnecting', (): void => {
        for (const socketRoom of socket.rooms) {
          if (socketRoom === socket.id) {
            continue;
          }
          const roomId: string = socketRoom;
          const room: Room | undefined = rooms.find((room: Room) => room.getId() === roomId);
          if (!room) continue;

          room.removeUser(socket.id);

          if (!room.hasUsers()) {
            removeRoomById(roomId);
          } else {
            io.to(roomId).emit('update-room', room.toObject());
          }
        }
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
