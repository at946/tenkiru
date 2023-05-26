'use client';

import { useEffect, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { NextPage } from 'next';

// interfaces
import { ClientToServerEvents, ServerToClientEvents } from '@/interfaces/socket';
import { Member } from '@/interfaces/member';
import { MemberType } from '@/interfaces/memberType';
import { Card } from '@/interfaces/card';
import { DeckType } from '@/interfaces/deckType';

// components
import RoomInfo from './components/RoomInfo';
import Table from './components/table/table';
import DeckSelect from './components/deckSelect';
import MemberTypeSelect from './components/memberTypeSelect';
import HandsCards from './components/hands/handsCards';
import toast, { Toast, Toaster } from 'react-hot-toast';

// stores
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateMembers } from '@/store/membersSlice';
import { selectCard, updateType } from '@/store/userSlice';
import { setCardsAreOpen, setDeckType } from '@/store/roomSlice';

// GA
import { event } from '@/lib/gtag';
import Loading from './components/loading';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

interface Props {
  roomId: string;
}

const RoomPage: NextPage<Props> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);
  const [isConnected, setIsConnected] = useState(false);

  // TODO: サーバーサイドでは動かしたくない。useEffect でもう少しいい感じにかけるはず。
  const audio = typeof window !== 'undefined' ? new Audio('/notify.mp3') : undefined;

  const socketInitializerCallback = useCallback(() => {
    if (!roomId) return;

    const socketPromise = fetch('/api/socket').then(() => {
      socket = io();

      socket.on('connect', () => setIsConnected(true));
      socket.on('update-members', onUpdateMembers);
      socket.on('update-deck-type', onUpdateDeckType);
      socket.on('update-cards-are-open', onUpdateCardsAreOpen);
      socket.on('nominate', onNominate);
      socket.on('disconnect', () => setIsConnected(false));

      socket.emit('join-room', roomId);
    });

    toast.promise(
      socketPromise,
      {
        loading: '入室中...',
        success: '入室完了！👍',
        error: '入室できませんでした...😢',
      },
      {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
        loading: {
          className: 'border-2 border-purple-600',
        },
        success: {
          className: 'border-2 border-lime-500',
        },
        error: {
          className: 'border-2 border-red-600',
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    socketInitializerCallback();
    return () => {
      socket.close();
    };
  }, [socketInitializerCallback]);

  const onUpdateMembers = (members: Member[]) => {
    dispatch(updateMembers(members));
    const me: Member | undefined = members.find((v) => v.id === socket.id);
    if (!me) return;
    dispatch(updateType(me.type));
    dispatch(selectCard(me.selectedCard));
  };

  const onUpdateDeckType = (newDeckType: DeckType) => {
    dispatch(setDeckType(newDeckType));
  };

  const onUpdateCardsAreOpen = (cardsAreOpen: boolean) => {
    dispatch(setCardsAreOpen(cardsAreOpen));
  };

  const onNominate = () => {
    toast('指名されました！', {
      className: 'border-2 border-purple-600',
      icon: '🎉',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
    audio?.play();
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

  const nominate = (memberId: string): void => {
    socket.emit('nominate', memberId);
  };

  return (
    <div className='container mx-auto px-5 text-center'>
      <RoomInfo roomId={roomId} extraClass='my-5' />
      <Table extraClass='mb-5' openCards={openCards} replay={replay} nominate={nominate} />
      {isConnected && (
        <>
          <DeckSelect select={changeDeckType} extraClass='mb-4' />
          <MemberTypeSelect select={changeMemberType} extraClass='mb-4' />
          <HandsCards putDownCard={putDownCard} />
        </>
      )}
      <Toaster />
    </div>
  );
};

export default RoomPage;
