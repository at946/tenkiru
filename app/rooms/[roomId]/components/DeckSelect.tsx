import { NextPage } from 'next';
import Decks from '@/data/deck';
import { Deck } from '@/interfaces/deck';
import { DeckType } from '@/interfaces/deckType';
import { useAppSelector } from '@/store/hooks';
import Select from '@/app/components/common/Select';
import { Room } from '@/class/room';
import useRoom from '@/hooks/useRoom';

interface Props {
  extraClass: string;
  select: (deckType: DeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ select, extraClass }) => {
  const room: Room = useRoom();
  const deckType: DeckType = room.getDeckType();
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);

  const options = Decks.map((deck: Deck) => {
    return { value: deck.key, label: deck.displayName };
  });

  return (
    <div className={extraClass || ''}>
      <label>
        デッキタイプ：
        <Select
          options={options}
          value={deckType}
          disabled={cardsAreOpen}
          onChange={(value: string) => {
            select(value as DeckType);
          }}
        />
      </label>
    </div>
  );
};

export default DeckSelect;
