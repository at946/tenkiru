'use client';

import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// interfaces
import { ClientToServerEvents, ServerToClientEvents } from '../../../interfaces/socket';
import { Member } from '../../../interfaces/member';
import { MemberType } from '../../../interfaces/memberType';
import { Card } from '../../../interfaces/card';
import { DeckType } from '../../../interfaces/deckType';

// components
import RoomInfo from './components/roomInfo';
import Table from './components/table/table';
import MemberTypeToggle from './components/memberTypeToggle';
import Tefuda from './components/tefuda/tefuda';

// stores
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateMembers } from '../../../store/membersSlice';
import { selectCard, updateType } from '../../../store/userSlice';
import { setCardsAreOpen, setDeckType } from '../../../store/roomSlice';

import { event } from '../../../lib/gtag';
import { NextPage } from 'next';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

interface Props {
  roomId: string;
}

const RoomPage: NextPage<Props> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);

  useEffect(() => {
    socketInitializer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const socketInitializer = () => {
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
          <Tefuda putDownCard={putDownCard} changeDeckType={changeDeckType} />
        </div>
      </section>
    </div>
  );
};

export default RoomPage;
