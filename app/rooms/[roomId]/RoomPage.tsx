'use client';

import { NextPage } from 'next';
import { useEffect, useCallback, useState } from 'react';

// socket.io
import { io, Socket } from 'socket.io-client';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';
import { User } from '@/class/user';

// interfaces
import { IFClientToServerEvents, IFServerToClientEvents } from '@/interfaces/socket';
import { IFUserType } from '@/interfaces/userType';
import { IFDeckType } from '@/interfaces/deckType';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

// components
import ClipboardCopyLink from './components/ClipboardCopyLink';
import Table from './components/table/Table';
import DeckSelect from './components/DeckSelect';
import MemberTypeSelect from './components/UserTypeSelect';
import HandsCards from './components/hands/HandsCards';
import toast, { Toaster } from 'react-hot-toast';

// stores
import { useAppDispatch } from '@/store/hooks';
import { updateRoom } from '@/store/roomSlice';

// GA
import { event } from '@/lib/gtag';
import { IFRoom } from '@/interfaces/room';

let socket: Socket<IFServerToClientEvents, IFClientToServerEvents>;

interface Props {
  roomId: string;
}

const RoomPage: NextPage<Props> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const room: Room = useRoom() || new Room();
  const user: User | undefined = room.findUserById(socket?.id);
  const deckType: IFDeckType = room.getDeckType();
  const [isConnected, setIsConnected] = useState(false);

  // TODO: サーバーサイドでは動かしたくない。useEffect でもう少しいい感じにかけるはず。
  const audio = typeof window !== 'undefined' ? new Audio('/notify.mp3') : undefined;

  const socketInitializerCallback = useCallback(() => {
    const socketPromise = fetch('/api/socket').then(() => {
      socket = io();

      socket.on('connect', () => setIsConnected(true));
      socket.on('update-room', onUpdateRoom);
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

  const onUpdateRoom = (room: IFRoom) => {
    dispatch(updateRoom(room));
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

  const changeDeckType = (newDeckType: IFDeckType): void => {
    socket.emit('change-deck-type', roomId, newDeckType);
  };

  const openCards = (): void => {
    event({ action: `open_with_${deckType}_deck`, category: 'engagement', label: '' });
    socket.emit('open-cards', roomId);
  };

  const replay = (): void => {
    socket.emit('replay', roomId);
  };

  const changeUserType = (userType: IFUserType): void => {
    socket.emit('change-user-type', roomId, userType);
  };

  const putDownCard = (value: IFTableCardValue): void => {
    socket.emit('select-card', roomId, value);
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
          <DeckSelect select={changeDeckType} extraClass='mb-4' />
          <MemberTypeSelect
            type={user?.getType() || 'player'}
            select={changeUserType}
            extraClass='mb-4'
          />
          <HandsCards user={user || new User()} select={putDownCard} />
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
