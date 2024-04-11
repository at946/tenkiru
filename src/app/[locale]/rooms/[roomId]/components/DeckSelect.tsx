import { IFOption } from '@/app/[locale]/components/common/Select';
import SelectWithLabel from '@/app/[locale]/components/common/SelectWithLabel';
import Decks from '@/data/deck';
import { IFDeck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';

interface Props {
  deckType: IFDeckType;
  disabled?: boolean;
  extraClass?: string;
  onChange: (deckType: IFDeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ deckType, disabled, extraClass, onChange }) => {
  const t = useTranslations('Room.Settings');
  const options: IFOption[] = Decks.map((deck: IFDeck) => {
    return { value: deck.key, displayValue: t(deck.displayName) };
  });

  return (
    <div className={extraClass || ''}>
      <SelectWithLabel
        label={t('Deck')}
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
