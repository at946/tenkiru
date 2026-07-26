import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import PokerCardBack from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardBack';
import PokerCardFront from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardFront';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';

interface Props {
  value: IFTableCardValue;
  playerId: string;
  isOpen?: boolean;
  delay?: number;
}

const TableCard: NextPage<Props> = ({ value, playerId, isOpen = false, delay = 0 }) => {
  const t = useTranslations('Room.Table');
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
      className='relative size-full'
      disabled={!isOpen}
      onClick={nominate}
      role='img'
      aria-label={isOpen ? `${t('Face-up table card')} ${value}` : t('Face-down table card')}
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
