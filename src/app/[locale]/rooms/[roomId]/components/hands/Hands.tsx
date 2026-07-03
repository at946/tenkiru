import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import HandCard from '@/app/[locale]/rooms/[roomId]/components/hands/HandCard';
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
  const [_hovered, _setHovered] = useState<IFTableCardValue>(null);
  const deck: IFDeck | undefined = Decks.find((deck: IFDeck) => deck.key === deckType);
  const _cardVariants = {
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
        const _isSelected: boolean = value === selectedValue;
        return (
          <HandCard
            key={value}
            value={value}
            selected={value === selectedValue}
            disabled={isDisabled}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
};

export default Hands;
