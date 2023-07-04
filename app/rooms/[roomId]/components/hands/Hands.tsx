import { NextPage } from 'next';

// components
import HandsCard from './HandsCard';

// data
import Decks from '@/data/deck';

// interfaces
import { IFDeck } from '@/interfaces/deck';
import { IFHandsCardValue } from '@/interfaces/handsCardValue';
import { IFRoom } from '@/interfaces/room';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

// recoil
import { useRecoilValue } from 'recoil';
import roomState from '@/recoil/atoms/roomAtom';

interface Props {
  selectedValue: IFTableCardValue;
  isDisabled?: boolean;
  onSelect: (value: IFTableCardValue) => void;
}

const Hands: NextPage<Props> = ({ selectedValue, isDisabled, onSelect }) => {
  const room: IFRoom = useRecoilValue(roomState);
  const deck: IFDeck | undefined = Decks.find((deck: IFDeck) => deck.key === room.deckType);

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
