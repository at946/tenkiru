import Decks from '@/data/deck';
import { IFDeck } from '@/interfaces/deck';
import { IFDeckType } from '@/interfaces/deckType';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';

interface IFOption {
  value: string;
  displayValue: string;
}

interface Props {
  deckType: IFDeckType;
  disabled?: boolean;
  className?: string;
  onChange: (deckType: IFDeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ deckType, disabled, className, onChange }) => {
  const t = useTranslations('Room.Settings');
  const options: IFOption[] = Decks.map((deck: IFDeck) => {
    return { value: deck.key, displayValue: t(deck.displayName) };
  });

  return (
    <div className={clsx(className)}>
      <label className='inline-flex gap-2'>
        <span>{t('Deck')}</span>
        <span>:</span>
        <select
          value={deckType}
          onChange={(e) => onChange(e.target.value as IFDeckType)}
          disabled={disabled}
          className={clsx(
            'border-0 border-b-2 border-text bg-transparent py-0 pl-2 pr-10 outline-none',
            'focus-visible:ring-0 enabled:hover:border-primary enabled:hover:text-primary enabled:focus-visible:border-primary enabled:focus-visible:text-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-dark-text',
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DeckSelect;
