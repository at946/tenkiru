import { IFOption } from '@/app/components/common/Select';
import SelectWithLabel from '@/app/components/common/SelectWithLabel';
import Decks from '@/data/deck';
import { IFDeck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';
import { NextPage } from 'next';

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
