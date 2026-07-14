import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Props = ComponentPropsWithoutRef<'select'> & {
  label: ReactNode;
};

const Select = ({ label, children, className, ...props }: Props) => {
  return (
    <label className='flex items-center'>
      {label}
      <select
        {...props}
        className={clsx(
          'cursor-pointer border-0 bg-transparent',
          'hover:text-primary',
          'focus-visible:text-primary',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-text',
          'dark:hover:text-dark-primary',
          'dark:focus-visible:text-dark-primary',
          className,
        )}
      >
        {children}
      </select>
    </label>
  );
};

export default Select;
