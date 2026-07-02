import { AnimatePresence, motion } from 'motion/react';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import PokerCardBack from '../poker-card/PokerCardBack';
import PokerCardFront from '../poker-card/PokerCardFront';
import TableCardSlot from './TableCardSlot';

interface Props {
  value: IFTableCardValue;
  isOpen?: boolean;
}

const TableCard: NextPage<Props> = ({ value, isOpen = false }) => {
  const t = useTranslations('Room.Table');
  const isBlank: boolean = value === null;

  return (
    <TableCardSlot aria-label={isBlank ? t('Unselected table card') : ''}>
      <AnimatePresence mode='wait'>
        {!isBlank && (
          <motion.div
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(3px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            // exit={{ opacity: 0, scale: 0.8, filter: 'blur(3px)' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          >
            {isOpen ? <PokerCardFront value={value} /> : <PokerCardBack />}
          </motion.div>
        )}
      </AnimatePresence>
    </TableCardSlot>
  );
};

export default TableCard;
