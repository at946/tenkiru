import { NextPage } from 'next';
import Decks from '@/data/deck';
import { Deck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';
import Select, { Option } from '@/app/components/common/Select';
import { Room } from '@/class/room';
import useRoom from '@/hooks/useRoom';

interface Props {
  disabled?: boolean;
  extraClass: string;
  onChange: (deckType: IFDeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ disabled, extraClass, onChange }) => {
  const room: Room = useRoom();
  const deckType: IFDeckType = room.getDeckType();

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
            onChange(value as IFDeckType);
          }}
        />
      </label>
    </div>
  );
};

export default DeckSelect;
