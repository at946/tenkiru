'use client';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import MenuHeader from '@/app/[locale]/rooms/[roomId]/components/MenuHeader';
import type { IFRoom } from '@/interfaces/room';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import type { IFUser } from '@/interfaces/user';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';
import DeckSelect from './components/DeckSelect';
import Hands from './components/hands/Hands';
import Table from './components/table/Table';
import UserTypeSelect from './components/UserTypeSelect';
import { playAudio } from './utils/playAudio';

interface Props {
  roomId: string;
}

const RoomPage: NextPage<Props> = ({ roomId }) => {
  const socket = useAtomValue(socketAtom);
  const setSocket = useSetAtom(socketAtom);
  const [room, setRoom] = useAtom(roomAtom);
  const t = useTranslations('Room');

  const users: IFUser[] = room.users;
  const user: IFUser | undefined = users.find((user: IFUser) => user.id === socket?.id);
  const [isConnected, setIsConnected] = useState(false);

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
    fetch('/api/socket').then(() => {
      const socketInstance = io();

      socketInstance.on('connect', () => setIsConnected(true));
      socketInstance.on('update-room', onUpdateRoom);
      socketInstance.on('receive-request-to-select', onRecieveRequestToSelect);
      socketInstance.on('nominate', onNominate);
      socketInstance.on('disconnect', () => setIsConnected(false));

      socketInstance.emit('join-room', roomId);

      setSocket(socketInstance);
    });

    return () => {
      setSocket((prevSocket) => {
        prevSocket?.close();
        return null;
      });
    };
  }, [roomId, onUpdateRoom, onNominate, onRecieveRequestToSelect, setSocket]);

  const openCards = (): void => {
    socket.emit('open-cards', roomId);
    event({
      action: `open_with_${room.deckType}_deck`,
      category: 'engagement',
      label: '',
    });
  };

  const requestToSelect = (): void => {
    socket.emit('request-to-select', roomId);
    toast.success(t('Asked players to choose a card'), {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'request-to-select', category: 'engagement', label: '' });
  };

  const replay = (): void => {
    socket.emit('replay', roomId);
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

  if (!isConnected || user === undefined) {
    return;
  }

  return (
    <>
      <MenuHeader roomId={roomId} />
      <UserTypeSelect type={user.type} />
      <DeckSelect disabled={room.isOpenPhase} />
      <Table
        className='mb-5'
        openCards={openCards}
        requestToSelect={requestToSelect}
        replay={replay}
        nominate={nominate}
      />
      <Hands
        deckType={room.deckType}
        selectedValue={user === undefined ? null : user.selectedCardValue}
        isDisabled={room.isOpenPhase || user === undefined || user.type !== 'player'}
        onSelect={selectCard}
      />
    </>
  );
};

export default RoomPage;
