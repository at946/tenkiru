'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

// socket.io
import { io, Socket } from 'socket.io-client';

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

// utils
import { playAudio } from './utils/playAudio';

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

  useEffect(() => {
    const socketPromise = fetch('/api/socket').then(() => {
      socket = io();

      socket.on('connect', () => setIsConnected(true));
      socket.on('update-room', onUpdateRoom);
      socket.on('receive-request-to-select', onRecieveRequestToSelect);
      socket.on('nominate', onNominate);
      socket.on('disconnect', () => setIsConnected(false));

      socket.emit('join-room', roomId);
    });

    toast.promise(
      socketPromise,
      { loading: '入室中...', success: '入室完了！👍', error: '入室できませんでした...😢' },
      { ariaProps: { role: 'status', 'aria-live': 'polite' } },
    );

    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const onUpdateRoom = (room: IFRoom): void => {
    dispatch(updateRoom(room));
  };

  const onRecieveRequestToSelect = (): void => {
    toast('そろそろカードを選んでください', {
      icon: '🙏',
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    playAudio('/audio/alert.mp3');
  };

  const onNominate = (): void => {
    toast('指名されました！', {
      icon: '🎉',
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    playAudio('/audio/notify.mp3');
  };

  const changeDeckType = (newDeckType: IFDeckType): void => {
    socket.emit('change-deck-type', roomId, newDeckType);
  };

  const openCards = (): void => {
    socket.emit('open-cards', roomId);
    event({ action: `open_with_${room.deckType}_deck`, category: 'engagement', label: '' });
  };

  const requestToSelect = (): void => {
    socket.emit('request-to-select', roomId);
    toast.success('カード未選択のプレイヤーに\n呼びかけました', {
      icon: '📣',
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: `request-to-select`, category: 'engagement', label: '' });
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
    toast.success('指名しました！', {
      icon: '👍',
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <div className='container mx-auto mb-10 mt-5 px-5 text-center'>
      <RoomInfo roomId={roomId} extraClass='mb-5' />
      <Table
        extraClass='mb-5'
        openCards={openCards}
        requestToSelect={requestToSelect}
        replay={replay}
        nominate={nominate}
      />
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
