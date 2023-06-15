import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { User } from '@/class/user';
import { IFUser } from '@/store/userSlice';
import { IFRoom } from '@/interfaces/room';
import { Room } from '@/class/room';
import useRoom from './useRoom';

const useUser = (id: string): User => {
  const room: Room = useRoom();

  const instantiatedUser = useMemo(() => {
    const user: User | undefined = room.findUserById(id);
    if (!user) return new User();
    return user;
  }, [id, room]);
  return instantiatedUser;
};

export default useUser;
