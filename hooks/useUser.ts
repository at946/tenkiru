import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { User } from '@/class/user';

const useUser = (): User => {
  const user = useAppSelector((state) => state.user.user);
  const instantiatedRoom = useMemo(() => {
    return new User(user.id, user.type);
  }, [user]);
  return instantiatedRoom;
};

export default useRoom;
