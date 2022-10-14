import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';
import RoomInfo from '../../components/roomInfo';
import Table from '../../components/table';
import Tefuda from '../../components/tefuda';
import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces/socket';
import { Member } from '../../interfaces/member';
import { Card } from '../../interfaces/card'

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const Page: NextPage = () => {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card>(null);
  const [cardsAreOpen, setCardsAreOpen] = useState<boolean>(false);

  const roomId = ((): string => {
    switch (typeof router.query.roomId) {
      case 'string':
        return router.query.roomId;
      case 'object':
        return router.query.roomId[0];
      default:
        return '';
    }
  })();

  useEffect(() => {
    socketInitializer(roomId);
  }, [roomId]);

  const socketInitializer = (roomId: string) => {
    (async () => {
      if (!roomId) return;

      await fetch('/api/socket');
      socket = io();

      socket.on('connect', () => {
        console.log('connect');
        socket.emit('join-room', roomId);
      });

      socket.on('update-members', (members) => {
        setMembers(members);
        const me: Member | undefined = members.find(v => v.id === socket.id)
        if (!!me) {
          setSelectedCard(me.card)
        }
      });

      socket.on('update-cards-are-open', (cardsAreOpen: boolean) => {
        setCardsAreOpen(cardsAreOpen);
      });

      socket.on('replay', (membersCards) => {
        setMembers(membersCards);
        setSelectedCard(null);
        setCardsAreOpen(false);
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });
    })();
  };

  const putDownCard = (card: number | string): void => {
    if (!cardsAreOpen) socket.emit('put-down-a-card', roomId, card);
  };

  const openCardsOnTable = (): void => {
    socket.emit('open-cards', roomId);
  };

  const cleanCardsOnTable = (): void => {
    socket.emit('clear-cards', roomId);
  };

  return (
    <div className='has-text-centered'>
      <section className='section'>
        <div className="container">
          <RoomInfo className='mb-6' roomId={roomId} />
          <Table
            members={members}
            cardsAreOpen={cardsAreOpen}
            openCardsOnTable={openCardsOnTable}
            cleanCardsOnTable={cleanCardsOnTable}
          />
        </div>
      </section>
      <section className='section'>
        <div className="container">
          <div className="tabs is-toggle is-centered">
            <ul>
              <li className="is-active" data-testid="memberTypePlayer">
                <a>Player</a>
              </li>
              <li className="" data-testid="memberTypeAudience">
                <a>Audience</a>
              </li>
            </ul>
          </div>
          <Tefuda selectedCard={selectedCard} putDownCard={putDownCard} />
        </div>
      </section>
    </div>
  );
};

export default Page;
