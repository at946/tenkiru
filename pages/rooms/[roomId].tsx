import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces/socket';
import RoomInfo from '../../components/roomInfo'
import Field from '../../components/field'

let socket: Socket<ServerToClientEvents, ClientToServerEvents>

const Page: NextPage = () => {
  const router = useRouter()
  const [memberEstimates, setMemberEstimates] = useState({})

  const roomId = ((): string => {
    switch (typeof router.query.roomId) {
      case 'string':
        return router.query.roomId
      case 'object':
        return router.query.roomId[0]
      default:
        return ''
    }
  })()

  useEffect(() => { socketInitializer(roomId) }, [roomId])

  const socketInitializer = (roomId: string) => {
    (async() => {
      if (!roomId) return
      
      await fetch('/api/socket')
      socket = io()

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('join-room', roomId)
      })

      socket.on('update-member-estimates', (memberEstimates) => {
        setMemberEstimates(memberEstimates)
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })()
  }

  return (
    <div className='has-text-centered'>
      <section className='section'>
        <RoomInfo roomId={roomId} />
      </section>
      <section className="section">
        <Field memberEstimates={memberEstimates} />
      </section>
    </div>
  )
}

export default Page