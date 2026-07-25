import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import toast from 'react-hot-toast';
import roomAtom from '@/jotai/atoms/roomAtom';
import { event } from '@/lib/gtag';

type Props = ComponentPropsWithoutRef<'button'>;

const RoomInfo = ({ className, ...props }: Props) => {
  const t = useTranslations('Room.RoomInfo');
  const room = useAtomValue(roomAtom);
  const copiedText: string = `${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${room.id}`;

  const copyText = async () => {
    await navigator.clipboard.writeText(copiedText);
    toast.success(t('Copied this Room URL'), {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'copy_room_url', category: 'engagement', label: '' });
  };

  return (
    <button
      {...props}
      type='button'
      onClick={copyText}
      className={clsx(
        'flex cursor-pointer items-center gap-2 hover:text-primary focus-visible:text-primary dark:focus-visible:text-dark-primary dark:hover:text-dark-primary',
        className,
      )}
      aria-label={t('Room invitation button')}
    >
      <span className='icon-[ic--round-home] text-2xl' />
      <span className='uppercase'>{room.id}</span>
      <span className='icon-[fa6-solid--link]' />
    </button>
  );
};

export default RoomInfo;
