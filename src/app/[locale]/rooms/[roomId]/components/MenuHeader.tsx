import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import DeckSelect from '@/app/[locale]/rooms/[roomId]/components/DeckSelect';
import RoomInfo from '@/app/[locale]/rooms/[roomId]/components/RoomInfo';
import UserTypeSelect from '@/app/[locale]/rooms/[roomId]/components/UserTypeSelect';

type Props = ComponentPropsWithoutRef<'div'>;

const MenuHeader = ({ className, ...props }: Props) => {
  return (
    <div {...props} className={clsx('grid grid-cols-1 gap-2 md:grid-cols-3', className)}>
      <RoomInfo className='mx-auto md:mx-0' />
      <DeckSelect className='mx-auto' />
      <UserTypeSelect className='mx-auto md:mr-0 md:ml-auto' />
    </div>
  );
};

export default MenuHeader;
