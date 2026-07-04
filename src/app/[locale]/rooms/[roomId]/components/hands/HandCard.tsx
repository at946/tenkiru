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
    <motion.button
      type='button'
      variants={variants}
      animate={currentVariant}
      transition={{ duration: 0.15 }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      aria-label={`${t('Hands card')} ${value}`}
      aria-pressed={selected}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(selected ? null : value)}
      className='rounded-xl disabled:cursor-not-allowed disabled:opacity-50'
    >
      <PokerCardFront value={value} className='w-24' />
    </motion.button>
  );
};

export default HandCard;
