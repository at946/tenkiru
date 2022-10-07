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

interface membersCards {
  [prop: string]: any
}

interface Rooms {
  [props: string]: membersCards
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseSocketIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running.')
  } else {
    console.log('Socket is initializing')
    
    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(res.socket.server as any);
    const rooms: Rooms = {}

    const cleanRoom = (roomId: string): void => {
      const membersCards: membersCards = rooms[roomId] || {}
      const roomMembers: string[] = Array.from(io.of('/').adapter.rooms.get(roomId) || new Set())
      
      const memberIds: string[] = Object.keys(membersCards)
      memberIds.map((memberId) => {
        if (!roomMembers.find(v => v === memberId)) {
          // すでに退出済みなので削除
          delete membersCards[memberId]
        } else {
          if (!membersCards[memberId]) {
            // まだ場にカードを出していないメンバーは後ろに並び直させる
            delete membersCards[memberId]
            membersCards[memberId] = null
          }
        }
      })

      roomMembers.map((memberId) => {
        if (!membersCards[memberId]) {
          membersCards[memberId] = null
        }
      })

      rooms[roomId] = membersCards
    }

    io.on('connection', (socket) => {
      socket.on('join-room', roomId => {
        socket.join(roomId)
        cleanRoom(roomId)
        io.to(roomId).emit('update-members-cards', rooms[roomId])
      })

      socket.on('put-down-a-card', (roomId, number) => {
        rooms[roomId][socket.id] = number
        cleanRoom(roomId)
        io.to(roomId).emit('update-members-cards', rooms[roomId])
      })

      socket.on('open-cards-on-table', roomId => {
        const membersCards = rooms[roomId]
        Object.keys(membersCards).map((memberId) => {
          if (!!membersCards[memberId]) {
            io.to(roomId).emit('update-cards-state', true)
            return
          }
        })
      })

      socket.on('disconnecting', () => {
        socket.rooms.forEach((roomId) => {
          if (!rooms[roomId]) return
          delete rooms[roomId][socket.id]
          io.to(roomId).emit('update-members-cards', rooms[roomId])
        })
      })
    })
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler