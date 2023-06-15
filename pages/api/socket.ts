import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as SocketIOServer } from 'socket.io';

// class
import { Room } from '@/class/room';
import { User } from '@/class/user';

// interface
import { IFClientToServerEvents, IFServerToClientEvents } from '@/interfaces/socket';
import { IFDeckType } from '@/interfaces/deckType';
import { IFUserType } from '@/interfaces/userType';
import { IFTableCardValue } from '@/interfaces/tableCardValue';
import { DeckType, IFDeckType } from '@/interfaces/deckType';
import { IFMemberType } from '@/interfaces/userType';
import { Member } from '@/class/member';
import { Game } from '@/class/game';

// utils
import { findRoomById } from './utils/findRoomById';

type NextApiResponseSocketIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseSocketIO) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer<IFClientToServerEvents, IFServerToClientEvents>(
      res.socket.server as any,
    );
    const rooms: Room[] = [];

    const removeRoomById = (roomId: string): void => {
      const removeRoomIndex: number = rooms.findIndex((room: Room) => room.getId() === roomId);
      rooms.splice(removeRoomIndex, 1);
    };

    io.on('connection', (socket) => {
      socket.on('join-room', (roomId: string) => {
        let room: Room | undefined = findRoomById({ rooms: rooms, roomId: roomId });
        if (!room) {
          room = new Room(roomId);
          rooms.push(room);
        }
        socket.join(roomId);
        room.addUser(new User(socket.id));

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('change-deck-type', (roomId: string, newDeckType: IFDeckType) => {
        const room: Room | undefined = findRoomById({ rooms: rooms, roomId: roomId });
        if (!room) return;

        room.setDeckType(newDeckType);
        room.resetCards();

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('change-user-type', (roomId: string, newUserType: IFUserType) => {
        const room: Room | undefined = findRoomById({ rooms: rooms, roomId: roomId });
        if (!room) return;

        const user: User | undefined = room.findUserById(socket.id);
        if (!user) return;

        user.setType(newUserType);
        user.resetCard();
        if (user.isPlayer()) {
          room.reUnshiftUser(user.getId());
        } else {
          room.rePushUser(user.getId());
        }

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('select-card', (roomId: string, selectedCardValue: IFTableCardValue) => {
        const room: Room | undefined = findRoomById({ rooms: rooms, roomId: roomId });
        if (!room) return;

        const user: User | undefined = room.findUserById(socket.id);
        if (!user) return;

        user.selectCard(selectedCardValue);
        if (user.hasSelectedCard()) {
          room.reUnshiftUser(user.getId());
        } else {
          room.rePushUser(user.getId());
        }

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('open-cards', (roomId) => {
        const room: Room | undefined = findRoomById({ rooms: rooms, roomId: roomId });
        if (!room) return;

        room.openCards();

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('replay', (roomId) => {
        const room: Room | undefined = findRoomById({ rooms: rooms, roomId: roomId });
        if (!room) return;

        room.replay();

        io.to(roomId).emit('update-room', room.toObject());
      });

      socket.on('nominate', (memberId) => {
        io.to(memberId).emit('nominate');
      });

      socket.on('disconnecting', () => {
        socket.rooms.forEach((roomId) => {
          const room: Room | undefined = rooms.find((room: Room) => room.getId() === roomId);
          if (!room) return;

          room.removeUser(socket.id);

          if (!room.hasUsers()) {
            removeRoomById(roomId);
          } else {
            io.to(roomId).emit('update-room', room.toObject());
          }
        });
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
