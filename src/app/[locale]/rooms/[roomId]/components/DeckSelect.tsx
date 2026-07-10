import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import Decks from '@/data/deck';
import type { IFDeck } from '@/interfaces/deck';
import type { IFDeckType } from '@/interfaces/deckType';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';

type TOption = {
  value: string;
  displayValue: string;
};

type Props = ComponentPropsWithoutRef<'div'> & {
  disabled?: boolean;
};

const DeckSelect = ({ disabled, className }: Props) => {
  const t = useTranslations('Room.Settings');
  const socket = useAtomValue(socketAtom);
  const room = useAtomValue(roomAtom);

  const options: TOption[] = Decks.map((deck: IFDeck) => {
    return { value: deck.key, displayValue: t(deck.displayName) };
  });

  const onChange = (newDeckType: IFDeckType) => {
    socket.emit('change-deck-type', room.id, newDeckType);
  };

  return (
    <div className={clsx(className)}>
      <label className='inline-flex gap-2'>
        <span>{t('Deck')}</span>
        <span>:</span>
        <select
          value={room.deckType}
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
