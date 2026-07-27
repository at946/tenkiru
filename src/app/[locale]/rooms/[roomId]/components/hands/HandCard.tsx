import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, useState } from 'react';
import PokerCardFront from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardFront';
import type { IFHandsCardValue } from '@/interfaces/handsCardValue';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';

type Props = ComponentPropsWithoutRef<'div'> & {
  value: IFHandsCardValue;
  selected: boolean;
  disabled?: boolean;
};

const variants = {
  default: {
    y: 0,
    rotate: 0,
  },
  hover: {
    y: -20,
    rotate: 3,
  },
  selected: {
    y: -20,
    rotate: 0,
  },
};

const HandCard = ({ value, selected, disabled = false }: Props) => {
  const t = useTranslations('Room.Hands');
  const socket = useAtomValue(socketAtom);
  const room = useAtomValue(roomAtom);
  const [hovered, setHovered] = useState(false);
  const currentVariant: string = selected ? 'selected' : hovered ? 'hover' : 'default';

  const onSelect = (value: IFTableCardValue): void => {
    socket?.emit('select-card', room.id, value);
  };

  return (
    <motion.button
      type='button'
      variants={variants}
      animate={currentVariant}
      transition={{ duration: 0.15 }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      aria-label={`${t('Hands card')} ${value}`}
      aria-pressed={selected}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => onSelect(selected ? null : value)}
      className='cursor-pointer rounded-xl shadow-lg disabled:cursor-not-allowed disabled:opacity-50'
    >
      <PokerCardFront value={value} className='w-24' />
    </motion.button>
  );
};

export default HandCard;
