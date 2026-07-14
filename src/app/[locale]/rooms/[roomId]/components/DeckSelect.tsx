import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import Select from '@/app/[locale]/components/common/Select';
import Decks from '@/data/deck';
import type { IFDeck } from '@/interfaces/deck';
import type { IFDeckType } from '@/interfaces/deckType';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';

type TOption = {
  value: string;
  displayValue: string;
};

type Props = ComponentPropsWithoutRef<'select'>;

const DeckSelect = ({ ...props }: Props) => {
  const t = useTranslations('Room.Settings');
  const socket = useAtomValue(socketAtom);
  const room = useAtomValue(roomAtom);
  const disabled: boolean = room.isOpenPhase;

  const options: TOption[] = Decks.map((deck: IFDeck) => {
    return { value: deck.key, displayValue: t(deck.displayName) };
  });

  const onChange = (newDeckType: IFDeckType) => {
    socket?.emit('change-deck-type', room.id, newDeckType);
  };

  return (
    <Select
      label={<span className={clsx('icon-[mdi--cards] text-2xl', disabled && 'opacity-50')} />}
      value={room.deckType}
      onChange={(e) => onChange(e.target.value as IFDeckType)}
      disabled={room.isOpenPhase}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </Select>
  );
};

export default DeckSelect;
