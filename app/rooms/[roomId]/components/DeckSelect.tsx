import { NextPage } from 'next';
import Decks from '@/data/deck';
import { Deck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';
import Select from '@/app/components/common/Select';
import { Room } from '@/class/room';
import useRoom from '@/hooks/useRoom';

interface Props {
  extraClass: string;
  select: () => void;
}

const DeckSelect: NextPage<Props> = ({ select, extraClass }) => {
  const room: Room = useRoom();
  const deckType: IFDeckType = room.getDeckType();
  const cardsAreOpen: boolean = room.areCardsOpen();

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
            select(value as IFDeckType);
          }}
        />
      </label>
    </div>
  );
};

export default DeckSelect;
