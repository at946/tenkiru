import { NextPage } from 'next';
import Select, { IFOption } from '@/app/components/common/Select';
import Decks from '@/data/deck';
import { IFDeck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';
import { useAppSelector } from '@/store/hooks';

interface Props {
  extraClass: string;
  onChange: (deckType: IFDeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ extraClass, onChange }) => {
  const deckType: IFDeckType = useAppSelector((state) => state.room.room.deckType);
  const isDisabled: boolean = useAppSelector((state) => state.room.room.isOpenPhase);

  const options: IFOption[] = Decks.map((deck: IFDeck) => {
    return { value: deck.key, label: deck.displayName };
  });

  return (
    <div className={extraClass || ''}>
      <label>
        <span className='dark:text-white'>デッキタイプ：</span>
        <Select
          options={options}
          value={deckType}
          disabled={isDisabled}
          onChange={(value: string) => {
            onChange(value as IFDeckType);
          }}
        />
      </label>
    </div>
  );
};

export default DeckSelect;
