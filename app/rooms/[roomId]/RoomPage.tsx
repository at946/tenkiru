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
import { IFRoom } from '@/interfaces/room';
import { IFUser } from '@/interfaces/user';

// components
import Table from './components/table/Table';
import DeckSelect from './components/DeckSelect';
import Hands from './components/hands/Hands';
import toast from 'react-hot-toast';
import MyToaster from '@/app/components/common/MyToaster';
import RoomInfo from './components/RoomInfo';
import UserTypeSelect from './components/UserTypeSelect';

// stores
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateRoom } from '@/store/roomSlice';

// GA
import { event } from '@/lib/gtag';

let socket: Socket<IFServerToClientEvents, IFClientToServerEvents>;

interface Props {
  roomId: string;
}

const RoomPage: NextPage<Props> = ({ roomId }) => {
  const dispatch = useAppDispatch();
  const room: IFRoom = useAppSelector((state) => state.room.room);
  const users: IFUser[] = room.users;
  const user: IFUser | undefined = users.find((user: IFUser) => user.id === socket?.id);
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
    event({ action: `open_with_${room.deckType}_deck`, category: 'engagement', label: '' });
    socket.emit('open-cards', roomId);
  };

  const replay = (): void => {
    socket.emit('replay', roomId);
  };

  const changeUserType = (userType: IFUserType): void => {
    socket.emit('change-user-type', roomId, userType);
  };

  const selectCard = (value: IFTableCardValue): void => {
    socket.emit('select-card', roomId, value);
  };

  const nominate = (memberId: string): void => {
    socket.emit('nominate', memberId);
    toast.success('指名しました！', { ariaProps: { role: 'status', 'aria-live': 'polite' } });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <div className='container mx-auto px-5 text-center'>
      <RoomInfo roomId={roomId} extraClass='text-center my-5' />
      <Table extraClass='mb-5' openCards={openCards} replay={replay} nominate={nominate} />

      {isConnected && (
        <>
          <DeckSelect extraClass='mb-4' onChange={changeDeckType} />
          <UserTypeSelect
            type={user?.type || 'player'}
            extraClass='mb-4'
            onChange={changeUserType}
          />
          <Hands
            selectedValue={user === undefined ? null : user.selectedCardValue}
            isDisabled={room.isOpenPhase || user === undefined || user.type !== 'player'}
            onSelect={selectCard}
          />
        </>
      )}

      <MyToaster />
    </div>
  );
};

export default RoomPage;
