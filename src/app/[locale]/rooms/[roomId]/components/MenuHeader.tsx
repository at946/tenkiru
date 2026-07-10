import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import RoomInfo from '@/app/[locale]/rooms/[roomId]/components/RoomInfo';
import type { IFRoomId } from '@/interfaces/room';

type Props = ComponentPropsWithoutRef<'div'> & {
  roomId: IFRoomId;
};

const MenuHeader = ({ roomId, className, ...props }: Props) => {
  return (
    <div {...props} className={clsx('flex', className)}>
      <RoomInfo roomId={roomId} />
    </div>
  );
};

export default MenuHeader;
