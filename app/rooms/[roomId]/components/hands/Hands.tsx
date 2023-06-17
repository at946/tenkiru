import { NextPage } from 'next';
import { IFHandsCardValue } from '@/interfaces/handsCardValue';
import HandsCard from './HandsCard';
import { IFDeck } from '@/interfaces/deck';
import { IFTableCardValue } from '@/interfaces/tableCardValue';
import { IFDeckType } from '@/interfaces/deckType';
import { useAppSelector } from '@/store/hooks';
import Decks from '@/data/deck';

interface Props {
  selectedValue: IFTableCardValue;
  isDisabled?: boolean;
  onSelect: (value: IFTableCardValue) => void;
}

const Hands: NextPage<Props> = ({ selectedValue, isDisabled, onSelect }) => {
  const deckType: IFDeckType = useAppSelector((state) => state.room.room.deckType);
  const deck: IFDeck | undefined = Decks.find((deck: IFDeck) => deck.key === deckType);

  return (
    <div className='flex flex-wrap justify-center gap-2' role='group' aria-label='手札'>
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
