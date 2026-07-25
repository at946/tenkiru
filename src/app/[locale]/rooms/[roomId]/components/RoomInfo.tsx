import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, useState } from 'react';
import roomAtom from '@/jotai/atoms/roomAtom';
import { event } from '@/lib/gtag';

type Props = ComponentPropsWithoutRef<'button'>;

const COPIED_DURATION_MS = 2000;

const RoomInfo = ({ className, ...props }: Props) => {
  const t = useTranslations('Room.RoomInfo');
  const room = useAtomValue(roomAtom);
  const [copied, setCopied] = useState(false);

  const copiedText: string = `${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${room.id}`;

  const handleCopyRoomUrl = async () => {
    if (copied) {
      return;
    }

    await navigator.clipboard.writeText(copiedText);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, COPIED_DURATION_MS);

    event({ action: 'copy_room_url', category: 'engagement', label: '' });
  };

  return (
    <button
      {...props}
      type='button'
      disabled={copied}
      onClick={handleCopyRoomUrl}
      className={clsx(
        'flex cursor-pointer items-center gap-2 not-disabled:hover:text-primary not-disabled:focus-visible:text-primary disabled:cursor-not-allowed dark:not-disabled:focus-visible:text-dark-primary dark:not-disabled:hover:text-dark-primary',
        className,
      )}
      aria-label={t('Room invitation button')}
    >
      <span className='icon-[ic--round-home] text-2xl' />
      <span className='uppercase'>{room.id}</span>
      <span className={copied ? 'icon-[mdi--check-bold]' : 'icon-[fa6-solid--link]'} />
      {copied && <span className='text-xs'>Copied</span>}
    </button>
  );
};

export default RoomInfo;
