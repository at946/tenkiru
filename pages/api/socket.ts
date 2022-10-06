import { Server as NetServer, Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'Socket.IO';
import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces/socket';

type NextApiResponseSocketIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
}

interface memberEstimates {
  [prop: string]: any
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseSocketIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running.')
  } else {
    console.log('Socket is initializing')
    
    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(res.socket.server as any);

    io.on('connection', (socket) => {

      const getRoomMemberEstimates = (roomId: string): Object => {
        const memberIds = io.of('/').adapter.rooms.get(roomId) || new Set()
        const memberEstimates: memberEstimates = {} 
        memberIds.forEach((memberId) => {
          memberEstimates[memberId] = null
        })
        return memberEstimates
      }

      socket.on('join-room', roomId => {
        socket.join(roomId)
        const roomMemberEstimates = getRoomMemberEstimates(roomId)
        io.to(roomId).emit('update-member-estimates', roomMemberEstimates)
      })

      socket.on('disconnecting', () => {
        socket.rooms.forEach((roomId) => {
          const roomMemberEstimates: memberEstimates = getRoomMemberEstimates(roomId)
          delete roomMemberEstimates[socket.id]
          io.to(roomId).emit('update-member-estimates', roomMemberEstimates)
        })
      })
    })

    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler