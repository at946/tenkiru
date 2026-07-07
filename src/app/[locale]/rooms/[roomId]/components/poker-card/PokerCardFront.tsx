import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';

type Props = ComponentPropsWithoutRef<'div'> & {
  value: IFTableCardValue;
};

const PokerCardFront = ({ value, className, ...props }: Props) => {
  return (
    <div
      role='img'
      {...props}
      className={clsx('aspect-card rounded-xl border-2 border-white/40 bg-white shadow-lg', className)}
    >
      <div className='relative flex size-full items-center justify-center'>
        <span className='absolute top-2 left-2 font-bold text-rose-700 text-xs' aria-hidden='true'>
          {value}
        </span>
        <span className='font-bold text-3xl text-rose-700'>{value}</span>
        <span className='absolute right-2 bottom-2 rotate-180 font-bold text-rose-700 text-xs' aria-hidden='true'>
          {value}
        </span>
      </div>
    </div>
  );
};

export default PokerCardFront;
