import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import DeckSelect from '@/app/[locale]/rooms/[roomId]/components/DeckSelect';
import RoomInfo from '@/app/[locale]/rooms/[roomId]/components/RoomInfo';
import UserTypeSelect from '@/app/[locale]/rooms/[roomId]/components/UserTypeSelect';

type Props = ComponentPropsWithoutRef<'div'>;

const MenuHeader = ({ className, ...props }: Props) => {
  return (
    <div {...props} className={clsx('flex justify-between', className)}>
      <RoomInfo />
      <DeckSelect />
      <UserTypeSelect />
    </div>
  );
};

export default MenuHeader;
