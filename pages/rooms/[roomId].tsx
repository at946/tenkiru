import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces/socket';
import RoomInfo from '../../components/roomInfo'
import Table from '../../components/table'
import Tefuda from '../../components/tefuda'

let socket: Socket<ServerToClientEvents, ClientToServerEvents>

const Page: NextPage = () => {
  const router = useRouter()
  const [membersCards, setMembersCards] = useState({})
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

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

      socket.on('update-members-cards', (membersCards) => {
        setMembersCards(membersCards)
        setSelectedCard(membersCards[socket.id])
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })()
  }

  const putDownCard = (value: number | string): void => {
    socket.emit('put-down-a-card', roomId, value)
  }

  return (
    <div className='has-text-centered'>
      <section className='section'>
        <RoomInfo className="mb-6" roomId={roomId} />
        <Table membersCards={membersCards} />
      </section>
      <section className="section">
        <Tefuda selectedCard={selectedCard} putDownCard={putDownCard} />
      </section>
    </div>
  )
}

export default Page