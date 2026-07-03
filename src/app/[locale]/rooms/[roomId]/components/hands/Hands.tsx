import clsx from 'clsx';
import { motion } from 'motion/react';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import PokerCardFront from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardFront';
import Decks from '@/data/deck';
import type { IFDeck } from '@/interfaces/deck';
import type { IFDeckType } from '@/interfaces/deckType';
import type { IFHandsCardValue } from '@/interfaces/handsCardValue';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';

interface Props {
  deckType: IFDeckType;
  selectedValue: IFTableCardValue;
  isDisabled?: boolean;
  onSelect: (value: IFTableCardValue) => void;
}

const Hands: NextPage<Props> = ({ deckType, selectedValue, isDisabled, onSelect }) => {
  const t = useTranslations('Room.Hands');
  const [hovered, setHovered] = useState<IFTableCardValue>(null);
  const deck: IFDeck | undefined = Decks.find((deck: IFDeck) => deck.key === deckType);
  const cardVariants = {
    default: {
      y: 0,
      scale: 1,
    },
    hover: {
      y: -8,
      scale: 1.05,
    },
    selected: {
      y: -20,
      scale: 1.08,
    },
  };

  return (
    <div role='radiogroup' className='mt-10 flex flex-wrap justify-center gap-3' aria-label={t('Hands')}>
      {deck?.cardValues.map((value: IFHandsCardValue) => {
        const isSelected: boolean = value === selectedValue;
        const variant: 'selected' | 'hover' | 'default' = isSelected
          ? 'selected'
          : hovered === value
            ? 'hover'
            : 'default';

        return (
          <label key={value}>
            <input
              type='radio'
              name='hand-card'
              className='hidden'
              value={value}
              checked={isSelected}
              disabled={isDisabled}
              aria-label={t('Hands card')}
              onClick={() => {
                isSelected && onSelect(null);
              }}
              onChange={() => onSelect(value)}
            />
            <motion.div
              variants={cardVariants}
              animate={variant}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
              whileTap={{ scale: 0.9 }}
            >
              <PokerCardFront value={value} className={clsx('w-24')} />
            </motion.div>
          </label>
        );
      })}
    </div>
  );
};

export default Hands;
