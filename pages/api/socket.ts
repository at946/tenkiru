import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as SocketIOServer } from 'socket.io';

// class
import { Room } from '@/class/room';
import { User } from '@/class/user';

// interface
import { ClientToServerEvents, ServerToClientEvents } from '@/interfaces/socket';
import { IFDeckType } from '@/interfaces/deckType';
import { IFUserType } from '@/interfaces/userType';
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

    const findRoomById = (roomId: string): Room | undefined => {
      return rooms.find((room: Room) => room.getId() === roomId);
    };

    io.on('connection', (socket) => {
      socket.on('join-room', (roomId: string) => {
        socket.join(roomId);

        let room: Room | undefined = findRoomById(roomId);
        if (!room) {
          room = new Room(roomId);
          rooms.push(room);
        }
        room.addUser(new User(socket.id));

        io.to(roomId).emit('update-room', room);
      });

      socket.on('change-deck-type', (roomId: string, newDeckType: IFDeckType) => {
        const room: Room | undefined = findRoomById(roomId);
        if (!room) return;

        room.setDeckType(newDeckType);
        room.resetCards();

        io.to(roomId).emit('update-room', room);
      });

      socket.on('change-user-type', (roomId: string, newUserType: IFUserType) => {
        const room: Room | undefined = findRoomById(roomId);
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

        io.to(roomId).emit('update-room', room);
      });

      socket.on('put-down-a-card', (roomId: string, selectedCardValue: IFTableCardValue) => {
        const room: Room | undefined = findRoomById(roomId);
        if (!room) return;

        const user: User = room.findUserById(socket.id);
        user.selectCard(selectedCardValue);
        if (user.hasSelectedCard()) {
          room.reUnshiftUser(user.getId());
        } else {
          room.rePushUser(user.getId());
        }

        io.to(roomId).emit('update-room', room);
      });

      socket.on('open-cards', (roomId) => {
        const room: Room | undefined = findRoomById(roomId);
        if (!room) return;

        room.openCards();

        io.to(roomId).emit('update-room', room);
      });

      socket.on('replay', (roomId) => {
        const room: Room | undefined = findRoomById(roomId);
        if (!room) return;

        room.replay();

        io.to(roomId).emit('update-room', room);
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
