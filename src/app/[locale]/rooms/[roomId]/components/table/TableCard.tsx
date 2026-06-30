import clsx from 'clsx';
import type { NextPage } from 'next';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import PokerCardSlot from '../poker-card/PokerCardSlot';

interface Props {
  value: IFTableCardValue;
  isOpen?: boolean;
}

const TableCard: NextPage<Props> = ({ value, isOpen = false }) => {
  const isBlank: boolean = value === null;

  return (
    <PokerCardSlot>
      {!isBlank && (
        <div
          className={clsx(
            'absolute inset-1 flex aspect-card w-24 items-center justify-center rounded-xl border-2 border-text font-bold text-2xl shadow-lg',
            !isOpen && 'bg-secondary',
            isOpen && 'bg-background text-text transition-all duration-1000 ease-out',
          )}
          style={!isBlank && !isOpen ? { transform: 'rotateY(-180deg)' } : {}}
          aria-hidden='true'
        >
          {isOpen && value}
        </div>
      )}
    </PokerCardSlot>
  );
};

export default TableCard;
