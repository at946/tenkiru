import { NextPage } from 'next';
import Decks from '@/data/deck';
import { Deck } from '@/interfaces/deck';
import { DeckType } from '@/interfaces/deckType';
import { useAppSelector } from '@/store/hooks';

interface Props {
  select: (deckType: DeckType) => void;
  extraClass: string;
}

const DeckSelect: NextPage<Props> = ({ select, extraClass }) => {
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);

  const change: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {
    select(e.target.value as DeckType);
  };

  return (
    <div className={extraClass || ''}>
      <span>デッキタイプ：</span>
      <select
        value={deckType}
        disabled={cardsAreOpen}
        onChange={change}
        aria-label='デッキタイプ選択'
        className='border-b-2 text-center outline-none hover:border-purple-600 focus:border-purple-600'
      >
        {Decks.map((deck: Deck) => (
          <option key={deck.key} value={deck.key}>
            {deck.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeckSelect;
