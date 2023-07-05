import { NextPage } from 'next';

// components
import SelectWithLabel from '@/app/components/common/SelectWithLabel';

// data
import Decks from '@/data/deck';

// interfaces
import { IFDeck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';
import { IFOption } from '@/app/components/common/Select';

interface Props {
  deckType: IFDeckType;
  disabled?: boolean;
  extraClass?: string;
  onChange: (deckType: IFDeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ deckType, disabled, extraClass, onChange }) => {
  const options: IFOption[] = Decks.map((deck: IFDeck) => {
    return { value: deck.key, label: deck.displayName };
  });

  return (
    <div className={extraClass || ''}>
      <SelectWithLabel
        label='デッキタイプ'
        options={options}
        value={deckType}
        disabled={disabled}
        onChange={(value: string) => {
          onChange(value as IFDeckType);
        }}
      />
    </div>
  );
};

export default DeckSelect;
