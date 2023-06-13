import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { User } from '@/class/user';

const useUser = (): User => {
  const user = useAppSelector((state) => state.user.user);
  const instantiatedUser = useMemo(() => {
    if (!user) return null;
    return new User(user.id, user.type);
  }, [user]);
  return instantiatedUser;
};

export default useUser;
