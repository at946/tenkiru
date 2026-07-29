import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import toast from 'react-hot-toast';
import PokerCardBack from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardBack';
import PokerCardFront from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardFront';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';

type Props = ComponentPropsWithoutRef<'button'> & {
  value: IFTableCardValue;
  playerId: string;
  isOpen?: boolean;
  delay?: number;
};

const TableCard = ({ value, playerId, isOpen = false, delay = 0, className, ...rest }: Props) => {
  const t = useTranslations('Room.Table');
  const room = useAtomValue(roomAtom);
  const socket = useAtomValue(socketAtom);

  const nominate = (): void => {
    socket?.emit('nominate', playerId);
    toast.success(t('Asked a player for comment'), {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 1.2, filter: 'blur(3px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
      className={clsx(
        'relative size-full rounded-xl',
        room.isOpenPhase
          ? 'cursor-pointer hover:ring-4 hover:ring-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500'
          : 'cursor-not-allowed',
        className,
      )}
      disabled={!isOpen}
      onClick={nominate}
      role='img'
      aria-label={isOpen ? `${t('Face-up table card')} ${value}` : t('Face-down table card')}
      {...rest}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isOpen ? 180 : 0, y: isOpen ? [0, -16, 0] : 0 }}
        transition={{
          rotateY: { duration: 0.5, delay, ease: 'easeInOut' },
          y: { duration: 0.5, delay, ease: 'easeInOut' },
        }}
        className='transform-3d relative size-full h-full w-hull'
      >
        <PokerCardBack className='backface-hidden absolute inset-0' />
        <PokerCardFront value={value} className='backface-hidden absolute inset-0 rotate-y-180' />
      </motion.div>
    </motion.button>
  );
};

export default TableCard;
