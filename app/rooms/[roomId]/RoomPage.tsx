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
import ClipboardCopyLink from './components/ClipboardCopyLink';
import Table from './components/table/Table';
import DeckSelect from './components/DeckSelect';
import MemberTypeSelect from './components/MemberTypeSelect';
import HandsCards from './components/hands/HandsCards';
import toast, { Toast, Toaster } from 'react-hot-toast';

// stores
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateMembers } from '@/store/membersSlice';

// GA
import { event } from '@/lib/gtag';
import { Room } from '@/class/room';
import { User } from '@/class/user';
import useRoom from '@/hooks/useRoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import SummaryTags from './components/table/SummaryTags';
import TableCardGroups from './components/table/TableCardGroups';
import TableButton from './components/table/TableButton';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

interface Props {
  roomId: string;
}

const RoomPage: NextPage<Props> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const room: Room = useRoom();
  const deckType: DeckType = room.getDeckType();
  const [isConnected, setIsConnected] = useState(false);

  // TODO: サーバーサイドでは動かしたくない。useEffect でもう少しいい感じにかけるはず。
  const audio = typeof window !== 'undefined' ? new Audio('/notify.mp3') : undefined;

  const socketInitializerCallback = useCallback(() => {
    const socketPromise = fetch('/api/socket').then(() => {
      socket = io();

      socket.on('connect', () => setIsConnected(true));
      socket.on('update-room', onUpdateRoom);
      socket.on('update-user', onUpdateUser);
      socket.on('update-members', onUpdateMembers);
      socket.on('update-deck-type', onUpdateDeckType);
      socket.on('update-are-cards-open', onUpdateAreCardsOpen);
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
        ariaProps: { role: 'status', 'aria-live': 'polite' },
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

  const onUpdateRoom = (room: Room) => {
    dispatch(updateRoom(room));
  };

  const onUpdateUser = (user: User) => {
    dispatch(updateUser(user));
  };

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

  const onUpdateAreCardsOpen = (areCardsOpen: boolean) => {
    dispatch(setAreCardsOpen(areCardsOpen));
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

  const updateSelectedCard = (card: Card): void => {
    socket.emit('update-selected-card', roomId, card);
  };

  const nominate = (memberId: string): void => {
    socket.emit('nominate', memberId);
  };

  const onCopiedRoomUrl = (): void => {
    toast.success('この部屋のURLをコピーしました', {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'copy_room_url', category: 'engagement', label: '' });
  };

  return (
    <div className='container mx-auto px-5 text-center'>
      <ClipboardCopyLink
        copiedText={`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${roomId}`}
        extraClass='my-5'
        onCopied={onCopiedRoomUrl}
      >
        <span>部屋番号：{roomId}</span>
        <FontAwesomeIcon icon={faLink} className='ml-2' />
      </ClipboardCopyLink>

      <Table extraClass='mb-5'>
        {deckType !== 'tShirtSize' && <SummaryTags extraClass='mb-4' />}
        <TableCardGroups extraClass='mb-5' nominate={nominate} />
        <TableButton clickOpenButton={openCards} clickReplayButton={replay} />
      </Table>

      {isConnected && (
        <>
          <DeckSelect disabled={areCardsOpen} extraClass='mb-4' onChange={changeDeckType} />
          <MemberTypeSelect extraClass='mb-4' onChange={changeMemberType} />
          <HandsCards
            deckType={deckType}
            selectedCard={selectedCard}
            disabled={areCardsOpen}
            updateSelectedCard={updateSelectedCard}
          />
          {!selectedCard ? 'false' : selectedCard}
        </>
      )}

      <Toaster
        toastOptions={{
          loading: { className: 'border border-purple-600' },
          success: { className: 'border border-lime-500' },
          error: { className: 'border border-red-600' },
        }}
      />
    </div>
  );
};

export default RoomPage;
