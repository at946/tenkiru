import { NextPage } from 'next';
import Select from '@/app/components/common/Select';
import { Room } from '@/class/room';
import Decks from '@/data/deck';
import useRoom from '@/hooks/useRoom';
import { IFDeck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';

interface Props {
  extraClass: string;
  select: (deckType: IFDeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ select, extraClass }) => {
  const room: Room = useRoom() || new Room();
  const deckType: IFDeckType = room.getDeckType();
  const cardsAreOpen: boolean = room.areCardsOpen();

  const options = Decks.map((deck: IFDeck) => {
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
