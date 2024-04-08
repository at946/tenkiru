import ClipboardCopyLink from '@/app/[locale]/components/common/ClipboardCopyLink';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface Props {
  roomId: string;
  className?: string;
  children: ReactNode;
}

const RoomInfo: NextPage = (props: Props) => {
  const t = useTranslations('Room.RoomInfo');
  return (
    <ClipboardCopyLink
      copiedText={`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${props.roomId}`}
      messageOnSuccess={t('Copied this Room URL')}
      gaAction='copy_room_url'
      className={clsx(
        props.className,
        'mx-auto flex flex-col items-center gap-1 md:flex-row md:gap-2',
      )}
    >
      <span>Room ID</span>
      <span className='hidden md:inline'>:</span>
      <span>{props.roomId}</span>
      <span className='icon-[fa6-solid--link]' />
    </ClipboardCopyLink>
  );
};

export default RoomInfo;
