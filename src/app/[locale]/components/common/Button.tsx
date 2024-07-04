import clsx from 'clsx';
import type { NextPage } from 'next';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  color?: 'primary' | 'secondary';
  isOutlined?: boolean;
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Button: NextPage<Props> = ({
  children,
  color = 'primary',
  isOutlined = false,
  disabled = false,
  title,
  ariaLabel,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) => {
  return (
    <button
      type='button'
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border-2 px-4 py-2 drop-shadow-md enabled:focus-visible:drop-shadow-lg enabled:hover:drop-shadow-lg disabled:cursor-not-allowed disabled:opacity-50',
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
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </button>
  );
};

export default Button;
