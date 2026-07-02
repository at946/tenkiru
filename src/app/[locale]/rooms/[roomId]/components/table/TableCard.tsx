import { motion } from 'motion/react';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import PokerCardBack from '../poker-card/PokerCardBack';
import PokerCardFront from '../poker-card/PokerCardFront';
import TableCardSlot from './TableCardSlot';

interface Props {
  value: IFTableCardValue;
  isOpen?: boolean;
  delay?: number;
}

const TableCard: NextPage<Props> = ({ value, isOpen = false, delay = 0 }) => {
  const t = useTranslations('Room.Table');
  const isBlank: boolean = value === null;

  return (
    <TableCardSlot aria-label={isBlank ? t('Unselected table card') : ''}>
      {!isBlank && (
        <motion.div
          initial={{ opacity: 0, scale: 1.2, filter: 'blur(3px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          className='relative size-full'
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
            <PokerCardBack className='absolute inset-0' />
            <PokerCardFront value={value} className='absolute inset-0' />
          </motion.div>
        </motion.div>
      )}
    </TableCardSlot>
  );
};

export default TableCard;
