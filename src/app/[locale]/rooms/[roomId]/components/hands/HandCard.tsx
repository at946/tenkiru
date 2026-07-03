import { motion } from 'motion/react';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import PokerCardFront from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardFront';
import type { IFHandsCardValue } from '@/interfaces/handsCardValue';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';

interface Props {
  value: IFHandsCardValue;
  selected: boolean;
  disabled?: boolean;
  onSelect: (value: IFTableCardValue) => void;
}

const variants = {
  default: {
    y: 0,
    scale: 1,
    rotate: 0,
    filter: 'brightness(1)',
  },
  hover: {
    y: -8,
    scale: 1.05,
    rotate: 2,
    filter: 'brightness(1.5)',
  },
  selected: {
    y: -20,
    scale: 1.08,
    rotate: 0,
    filter: 'brightness(2)',
  },
};

const HandCard: NextPage<Props> = ({ value, selected, disabled = false, onSelect }) => {
  const t = useTranslations('Room.Hands');
  const [hovered, setHovered] = useState(false);
  const currentVariant: string = selected ? 'selected' : hovered ? 'hover' : 'default';

  return (
    <label>
      <input
        type='radio'
        name='hand-card'
        className='hidden'
        value={value}
        checked={selected}
        disabled={disabled}
        aria-label={t('Hands card')}
        onClick={() => {
          selected && onSelect(null);
        }}
        onChange={() => onSelect(value)}
      />
      <motion.div
        variants={variants}
        animate={currentVariant}
        transition={{ duration: 0.15 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.9 }}
      >
        <PokerCardFront value={value} className='w-24' />
      </motion.div>
    </label>
  );
};

export default HandCard;
