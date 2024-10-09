import Decks from '@/data/deck';
import type { IFDeck } from '@/interfaces/deck';
import type { IFDeckType } from '@/interfaces/deckType';
import type { IFHandsCardValue } from '@/interfaces/handsCardValue';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';

interface Props {
  deckType: IFDeckType;
  selectedValue: IFTableCardValue;
  isDisabled?: boolean;
  onSelect: (value: IFTableCardValue) => void;
}

const Hands: NextPage<Props> = ({ deckType, selectedValue, isDisabled, onSelect }) => {
  const t = useTranslations('Room.Hands');
  const deck: IFDeck | undefined = Decks.find((deck: IFDeck) => deck.key === deckType);

  return (
    <div role='radiogroup' className='flex flex-wrap justify-center gap-2' aria-label={t('Hands')}>
      {deck?.cardValues.map((value: IFHandsCardValue) => {
        const isSelected: boolean = value === selectedValue;
        return (
          <label
            key={value}
            className={clsx(
              'flex aspect-card w-24 cursor-pointer items-center justify-center rounded-md border-2 border-text bg-background font-bold text-2xl text-text shadow',
              'enabled:focus-visible:shadow-2xl',
              'has-[:checked]:bg-primary has-[:checked]:text-dark-text',
              'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-25 has-[:disabled]:dark:opacity-50',
              'md:enabled:hover:-translate-y-2 md:enabled:focus-visible:-translate-y-2 md:enabled:hover:shadow-2xl',
            )}
          >
            <input
              type='radio'
              name='hand-card'
              className='absolute left-[-9999px]'
              value={value}
              checked={isSelected}
              disabled={isDisabled}
              aria-label={t('Hands card')}
              onClick={() => {
                isSelected && onSelect(null);
              }}
              onChange={() => onSelect(value)}
            />
            {value}
          </label>
        );
      })}
    </div>
  );
};

export default Hands;
