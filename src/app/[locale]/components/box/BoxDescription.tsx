import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'p'>;

const BoxDescription = ({ children, className, ...rest }: Props) => {
  return (
    <p {...rest} className={`text-sm ${className}`}>
      {children}
    </p>
  );
};

export default BoxDescription;
