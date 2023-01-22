import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';

// components
import RoomInfo from '../../components/rooms/roomInfo';
import Table from '../../components/rooms/table/table';
import MemberTypeToggle from '../../components/rooms/memberTypeToggle';
import Tefuda from '../../components/rooms/tefuda/tefuda';

// interfaces
import { ClientToServerEvents, ServerToClientEvents } from '../../interfaces/socket';
import { Member } from '../../interfaces/member';
import { MemberType } from '../../interfaces/memberType';
import { Card } from '../../interfaces/card';
import { DeckType } from '../../interfaces/deckType';

// store
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateMembers } from '../../store/membersSlice';
import { selectCard, updateType } from '../../store/userSlice';
import { setCardsAreOpen, setDeckType } from '../../store/roomSlice';

import { event } from '../../lib/gtag';
import Head from 'next/head';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const Page: NextPage = () => {
  const description: string = 'プランニングポーカーやろ〜。Tenkirに集合〜🙌';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        dispatch(updateMembers(members));
        const me: Member | undefined = members.find((v) => v.id === socket.id);
        if (!me) return;
        dispatch(updateType(me.type));
        dispatch(selectCard(me.selectedCard));
      });

      socket.on('update-deck-type', (newDeckType: DeckType) => {
        dispatch(setDeckType(newDeckType));
      });

      socket.on('update-cards-are-open', (cardsAreOpen: boolean) => {
        dispatch(setCardsAreOpen(cardsAreOpen));
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });
    })();
  };

  const changeDeckType = (newDeckType: DeckType): void => {
    socket.emit('change-deck-type', roomId, newDeckType);
  };

  const openCards = (): void => {
    event({ action: `open_with_${deckType}_deck`, category: 'engagement', label: '' });
    socket.emit('open-cards', roomId);
  };

  const replay = (): void => {
    socket.emit('replay', roomId);
  };

  const changeMemberType = (memberType: MemberType): void => {
    socket.emit('change-member-type', roomId, memberType);
  };

  const putDownCard = (card: Card): void => {
    socket.emit('put-down-a-card', roomId, card);
  };

  return (
    <main>
      <Head>
        <meta key='description' name='description' content={description} />
        <meta key='og:description' property='og:description' content={description} />
      </Head>
      <div className='has-text-centered'>
        <section className='section'>
          <div className='container'>
            <div className='mb-4'>
              <RoomInfo roomId={roomId} />
            </div>
            <Table openCards={openCards} replay={replay} />
          </div>
        </section>
        <section className='section'>
          <div className='container'>
            <MemberTypeToggle changeMemberType={changeMemberType} />
            <Tefuda
              putDownCard={putDownCard}
              changeDeckType={changeDeckType}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
