import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

const TableBoard = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={clsx(
        'rounded-xs py-5',
        'bg-radial from-emerald-300 via-emerald-400 to-emerald-500',
        'shadow-[inset-0_2px_3px_rgba(255,255,255,.18),inset-0_0_18px_rgba(0,0,0,.35)]',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TableBoard;
