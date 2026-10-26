import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'p'>;

const BoxTitle = ({ children, className, ...rest }: Props) => {
  return (
    <p {...rest} className={`break-auto-phrase text-lg font-semibold ${className}`}>
      {children}
    </p>
  );
};

export default BoxTitle;
