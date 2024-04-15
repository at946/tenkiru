import ClipboardCopyLink from '@/app/components/ClipboardCopyLink';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';

interface Props {
  roomId: string;
  className?: string;
}

const RoomInfo: NextPage<Props> = ({ roomId, className }) => {
  const t = useTranslations('Room.RoomInfo');
  return (
    <ClipboardCopyLink
      copiedText={`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${roomId}`}
      messageOnSuccess={t('Copied this Room URL')}
      gaAction='copy_room_url'
      className={clsx(className, 'mx-auto flex flex-col items-center gap-1 md:flex-row md:gap-2')}
    >
      <span>Room ID</span>
      <span className='hidden md:inline'>:</span>
      <span>{roomId}</span>
      <span className='icon-[fa6-solid--link]' />
    </ClipboardCopyLink>
  );
};

export default RoomInfo;
