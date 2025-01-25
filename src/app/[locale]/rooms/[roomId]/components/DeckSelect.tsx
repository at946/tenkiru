import Decks from '@/data/deck';
import type { IFDeck } from '@/interfaces/deck';
import type { IFDeckType } from '@/interfaces/deckType';
import clsx from 'clsx';
import type { NextPage } from 'next';
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
            'border-0 border-text border-b-2 bg-transparent py-0 pr-10 pl-2 outline-hidden',
            'focus-visible:ring-0 enabled:focus-visible:border-primary enabled:focus-visible:text-primary enabled:hover:border-primary enabled:hover:text-primary',
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
