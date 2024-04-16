'use client';

import { IFDeckType } from '@/interfaces/deckType';
import { IFRoom } from '@/interfaces/room';
import { IFClientToServerEvents, IFServerToClientEvents } from '@/interfaces/socket';
import { IFTableCardValue } from '@/interfaces/tableCardValue';
import { IFUser } from '@/interfaces/user';
import { IFUserType } from '@/interfaces/userType';
import { event } from '@/lib/gtag';
import isRoomState from '@/recoil/atoms/roomAtom';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { Socket, io } from 'socket.io-client';
import DeckSelect from './components/DeckSelect';
import UserTypeSelect from './components/UserTypeSelect';
import Hands from './components/hands/Hands';
import Table from './components/table/Table';
import { playAudio } from './utils/playAudio';

let socket: Socket<IFServerToClientEvents, IFClientToServerEvents>;

interface Props {
  roomId: string;
}

const RoomPage: NextPage<Props> = ({ roomId }) => {
  const [room, setRoom] = useRecoilState<IFRoom>(isRoomState);
  const users: IFUser[] = room.users;
  const user: IFUser | undefined = users.find((user: IFUser) => user.id === socket?.id);
  const [isConnected, setIsConnected] = useState(false);
  const t = useTranslations('Room');

  const onUpdateRoom = useCallback(
    (room: IFRoom): void => {
      setRoom(room);
    },
    [setRoom],
  );

  const onRecieveRequestToSelect = useCallback((): void => {
    toast.success(t("It's time to choose a card"), {
      icon: '🙏',
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    playAudio('/audio/alert.mp3');
  }, [t]);

  const onNominate = useCallback((): void => {
    toast.success(t('Please comment'), {
      icon: '💬',
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    playAudio('/audio/notify.mp3');
  }, [t]);

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
      {
        loading: t('Entering'),
        success: t('Entry completed'),
        error: t('Could not enter'),
      },
      { ariaProps: { role: 'status', 'aria-live': 'polite' } },
    );

    return () => {
      socket.close();
    };
  }, [roomId, t, onUpdateRoom, onNominate, onRecieveRequestToSelect]);

  const changeDeckType = (newDeckType: IFDeckType): void => {
    socket.emit('change-deck-type', roomId, newDeckType);
  };

  const openCards = (): void => {
    socket.emit('open-cards', roomId);
    event({ action: `open_with_${room.deckType}_deck`, category: 'engagement', label: '' });
  };

  const requestToSelect = (): void => {
    socket.emit('request-to-select', roomId);
    toast.success(t('Asked players to choose a card'), {
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
    toast.success(t('Asked a player for comment'), {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <div>
      <Table
        className='mb-5'
        openCards={openCards}
        requestToSelect={requestToSelect}
        replay={replay}
        nominate={nominate}
      />
      {isConnected && (
        <>
          <UserTypeSelect
            type={user?.type || 'player'}
            className='mb-8'
            onChange={changeUserType}
          />
          <DeckSelect
            deckType={room.deckType}
            disabled={room.isOpenPhase}
            extraClass='mb-4'
            onChange={changeDeckType}
          />
          <Hands
            deckType={room.deckType}
            selectedValue={user === undefined ? null : user.selectedCardValue}
            isDisabled={room.isOpenPhase || user === undefined || user.type !== 'player'}
            onSelect={selectCard}
          />
        </>
      )}
    </div>
  );
};

export default RoomPage;
