import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Props = ComponentPropsWithoutRef<'select'> & {
  label: ReactNode;
};

const Select = ({ label, children, className, ...props }: Props) => {
  return (
    <label className='flex items-center'>
      {label}
      <select {...props} className={clsx('cursor-pointer border-0 bg-transparent uppercase', className)}>
        {children}
      </select>
    </label>
  );
};

export default Select;
