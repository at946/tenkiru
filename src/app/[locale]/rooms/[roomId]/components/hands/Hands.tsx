import Decks from '@/data/deck';
import type { IFDeck } from '@/interfaces/deck';
import type { IFDeckType } from '@/interfaces/deckType';
import type { IFHandsCardValue } from '@/interfaces/handsCardValue';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import HandsCard from './HandsCard';

interface Props {
  deckType: IFDeckType;
  selectedValue: IFTableCardValue;
  isDisabled?: boolean;
  onSelect: (value: IFTableCardValue) => void;
}

const Hands: NextPage<Props> = ({ deckType, selectedValue, isDisabled, onSelect }) => {
  const t = useTranslations('Room.Hands');

  const deck: IFDeck | undefined = Decks.find((deck: IFDeck) => deck.key === deckType);

  return (
    <div className='flex flex-wrap justify-center gap-2' role='group' aria-label={t('Hands')}>
      {deck?.cardValues.map((value: IFHandsCardValue) => (
        <HandsCard
          key={value}
          value={value}
          isSelected={value === selectedValue}
          isDisabled={!!isDisabled}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};

export default Hands;
