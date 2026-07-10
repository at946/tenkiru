import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import ClipboardCopyLink from '@/app/[locale]/components/common/ClipboardCopyLink';
import roomAtom from '@/jotai/atoms/roomAtom';

type Props = ComponentPropsWithoutRef<'div'>;

const RoomInfo = ({ className, ...props }: Props) => {
  const t = useTranslations('Room.RoomInfo');
  const room = useAtomValue(roomAtom);
  return (
    <ClipboardCopyLink
      copiedText={`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${room.id}`}
      messageOnSuccess={t('Copied this Room URL')}
      gaAction='copy_room_url'
      className={clsx(className, 'mx-auto flex flex-col items-center gap-1 md:flex-row md:gap-2')}
      {...props}
    >
      <span>Room ID</span>
      <span className='hidden md:inline'>:</span>
      <span>{room.id}</span>
      <span className='icon-[fa6-solid--link]' />
    </ClipboardCopyLink>
  );
};

export default RoomInfo;
