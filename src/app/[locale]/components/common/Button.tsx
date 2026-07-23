import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
  color?: 'primary' | 'secondary';
  isOutlined?: boolean;
};

const Button = ({ children, color = 'primary', isOutlined = false, title, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      type='button'
      className={clsx(
        'inline-flex items-center gap-1 rounded-xl border-2 px-4 py-2 drop-shadow-md enabled:focus-visible:drop-shadow-lg enabled:hover:drop-shadow-lg disabled:cursor-not-allowed disabled:opacity-50',
        color === 'primary' && 'border-primary',
        color === 'secondary' && 'border-secondary',
        isOutlined && 'bg-background enabled:focus-visible:text-background enabled:hover:text-background',
        isOutlined && color === 'primary' && 'text-primary enabled:focus-visible:bg-primary enabled:hover:bg-primary',
        isOutlined &&
          color === 'secondary' &&
          'text-secondary enabled:focus-visible:bg-secondary enabled:hover:bg-secondary',
        !isOutlined && 'text-white enabled:focus-visible:opacity-75 enabled:hover:opacity-75',
        !isOutlined && color === 'primary' && 'bg-primary',
        !isOutlined && color === 'secondary' && 'bg-secondary',
        className,
      )}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
