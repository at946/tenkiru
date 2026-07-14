'use client';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import MenuHeader from '@/app/[locale]/rooms/[roomId]/components/MenuHeader';
import type { IFRoom } from '@/interfaces/room';
import type { IFUser } from '@/interfaces/user';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import Hands from './components/hands/Hands';
import Table from './components/table/Table';
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

  if (!isConnected || user === undefined) {
    return;
  }

  return (
    <>
      <hr className='border-text dark:border-dark-text' />
      <MenuHeader className='my-2' />
      <hr className='mb-6 border-text dark:border-dark-text' />
      <Table className='mb-5' />
      <Hands
        deckType={room.deckType}
        selectedValue={user === undefined ? null : user.selectedCardValue}
        isDisabled={room.isOpenPhase || user === undefined || user.type !== 'player'}
      />
    </>
  );
};

export default RoomPage;
