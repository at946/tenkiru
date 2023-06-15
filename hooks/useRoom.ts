import { useMemo } from 'react';

// store
import { useAppSelector } from '@/store/hooks';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard } from '@/class/tableCard';
import { IFRoom } from '@/interfaces/room';
import { IFUser } from '@/interfaces/user';
import { User } from '@/class/user';

// interfaces

const useRoom = (): Room => {
  const roomState: IFRoom = useAppSelector((state) => state.room.room);

  const instantiatedRoom = useMemo(() => {
    if (!roomState) return null;

    const users: IFUser[] = [];
    roomState.users.forEach((user: IFUser) => {
      users.push(new User(user.id, user.isPlayer, user.hasSelectedCard, user.selectedCardValue))
    })

    return new Room(roomState.id, roomState.deckType, roomState.isOpenPhase, users);
  }, [roomState]);

  return instantiatedRoom;
};

export default useRoom;
