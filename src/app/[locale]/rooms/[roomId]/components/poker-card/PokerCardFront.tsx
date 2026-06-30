import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'> & {
  value: number | '?';
};

const PokerCardFront = ({ value, className, ...props }: Props) => {
  return (
    <div {...props} className={clsx('rounded-xl border-2 border-text bg-background shadow-lg', className)}>
      {value}
    </div>
  );
};

export default PokerCardFront;
