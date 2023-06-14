import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { User } from '@/class/user';
import { IFUser } from '@/store/userSlice';

const useUser = (): User => {
  const user: IFUser = useAppSelector((state) => state.user.user);
  const instantiatedUser = useMemo(() => {
    if (!user) return null;
    return new User(user.id, user.type);
  }, [user]);
  return instantiatedUser;
};

export default useUser;
