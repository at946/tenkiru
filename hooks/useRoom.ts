import { useMemo } from 'react';

// class
import { Room } from '@/class/room';
import { User } from '@/class/user';

// interfaces
import { IFRoom } from '@/interfaces/room';
import { IFUser } from '@/interfaces/user';

// store
import { useAppSelector } from '@/store/hooks';

const useRoom = (): Room => {
  const roomState: IFRoom = useAppSelector((state) => state.room.room);

  const instantiatedRoom = useMemo(() => {
    if (!roomState) return new Room();
    const users: User[] = [];
    roomState.users.forEach((user: IFUser) => {
      users.push(new User(user.id, user.type, user.selectedCardValue));
    });

    return new Room(roomState.id, roomState.deckType, roomState.isOpenPhase, users);
  }, [roomState]);

  return instantiatedRoom;
};

export default useRoom;
