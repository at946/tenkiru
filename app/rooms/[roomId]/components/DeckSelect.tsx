import { NextPage } from 'next';
import Decks from '@/data/deck';
import { Deck } from '@/interfaces/deck';
import { DeckType } from '@/interfaces/deckType';
import { useAppSelector } from '@/store/hooks';
import Select from '@/app/components/common/Select';

interface Props {
  extraClass: string;
  select: (deckType: DeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ select, extraClass }) => {
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);

  const options = Decks.map((deck: Deck) => {
    return { value: deck.key, label: deck.displayName };
  });

  return (
    <div className={extraClass || ''}>
      <span>デッキタイプ：</span>
      <Select
        options={options}
        value={deckType}
        disabled={cardsAreOpen}
        ariaLabel='デッキタイプ選択'
        onChange={(value: string) => {
          select(value as DeckType);
        }}
      />
    </div>
  );
};

export default DeckSelect;
