import { NextPage } from 'next';
import Select from '@/app/components/common/Select';
import { Room } from '@/class/room';
import Decks from '@/data/deck';
import useRoom from '@/hooks/useRoom';
import { IFDeck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';

interface Props {
  disabled?: boolean;
  extraClass: string;
  onChange: (deckType: IFDeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ disabled, extraClass, onChange }) => {
  const room: Room = useRoom();
  const deckType: IFDeckType = room.getDeckType();

  const options: Option[] = Decks.map((deck: IFDeck) => {
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
