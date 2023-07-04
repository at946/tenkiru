import { NextPage } from 'next';

// components
import Select, { IFOption } from '@/app/components/common/Select';

// data
import Decks from '@/data/deck';

// interfaces
import { IFRoom } from '@/interfaces/room';
import { IFDeck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';

// recoil
import { useRecoilValue } from 'recoil';
import roomState from '@/recoil/atoms/roomAtom';

interface Props {
  extraClass: string;
  onChange: (deckType: IFDeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ extraClass, onChange }) => {
  const room: IFRoom = useRecoilValue(roomState)

  const options: IFOption[] = Decks.map((deck: IFDeck) => {
    return { value: deck.key, label: deck.displayName };
  });

  return (
    <div className={extraClass || ''}>
      <label>
        <span className='dark:text-white'>デッキタイプ：</span>
        <Select
          options={options}
          value={room.deckType}
          disabled={room.isOpenPhase}
          onChange={(value: string) => {
            onChange(value as IFDeckType);
          }}
        />
      </label>
    </div>
  );
};

export default DeckSelect;
