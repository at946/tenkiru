import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef;

const BoxTitle = ({ children, className, ...rest }: Props) => {
  return (
    <p {...rest} className={`break-auto-phrase font-semibold text-lg ${className}`}>
      {children}
    </p>
  );
};

export default BoxTitle;
