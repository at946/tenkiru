import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

const PokerCardBack = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      {...props}
      className={clsx(
        'flex items-center justify-center rounded-md border-2 border-text bg-secondary shadow-md',
        className,
      )}
    />
  );
};

export default PokerCardBack;