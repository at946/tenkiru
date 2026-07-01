import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';

type Props = ComponentPropsWithoutRef<'div'> & {
  value: IFTableCardValue;
};

const PokerCardFront = ({ value, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={clsx(
        'flex aspect-card items-center justify-center rounded-xl border-2 border-text bg-background font-bold text-2xl text-text shadow-lg',
        className,
      )}
    >
      {value}
    </div>
  );
};

export default PokerCardFront;
