import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import ClipboardCopyLink from '@/app/[locale]/components/common/ClipboardCopyLink';
import roomAtom from '@/jotai/atoms/roomAtom';

const RoomInfo = () => {
  const t = useTranslations('Room.RoomInfo');
  const room = useAtomValue(roomAtom);
  return (
    <ClipboardCopyLink
      copiedText={`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${room.id}`}
      messageOnSuccess={t('Copied this Room URL')}
      gaAction='copy_room_url'
      className='flex cursor-pointer items-center gap-2'
    >
      <span className='icon-[ic--round-home] text-2xl' />
      <span className='uppercase'>{room.id}</span>
      <span className='icon-[fa6-solid--link]' />
    </ClipboardCopyLink>
  );
};

export default RoomInfo;
