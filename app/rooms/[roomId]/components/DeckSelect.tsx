import { NextPage } from 'next';
import Decks from '@/data/deck';
import { Deck } from '@/interfaces/deck';
import { DeckType } from '@/interfaces/deckType';
import { useAppSelector } from '@/store/hooks';
import Select, { Option } from '@/app/components/common/Select';

interface Props {
  disabled?: boolean;
  extraClass: string;
  onChange: (deckType: DeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ disabled, extraClass, onChange }) => {
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);

  const options: Option[] = Decks.map((deck: Deck) => {
    return { value: deck.key, label: deck.displayName };
  });

  return (
    <div className={extraClass || ''}>
      <label>
        デッキタイプ：
        <Select
          options={options}
          value={deckType}
          disabled={disabled}
          onChange={(value: string) => {
            onChange(value as DeckType);
          }}
        />
      </label>
    </div>
  );
};

export default DeckSelect;
