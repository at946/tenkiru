import clsx from 'clsx';
import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: string;
  color: 'primary' | 'secondary';
  isOutlined?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Button: NextPage<Props> = ({
  children,
  title,
  color = 'primary',
  isOutlined,
  disabled,
  className,
  ariaLabel,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border-2 px-4 py-2 drop-shadow-md enabled:hover:drop-shadow-lg enabled:focus:drop-shadow-lg disabled:cursor-not-allowed disabled:opacity-50',
        color === 'primary' && 'border-primary',
        color === 'secondary' && 'border-secondary',
        isOutlined && 'bg-background enabled:hover:text-background enabled:focus:text-background',
        isOutlined &&
          color === 'primary' &&
          'text-primary enabled:hover:bg-primary enabled:focus:bg-primary',
        isOutlined &&
          color === 'secondary' &&
          'text-secondary enabled:hover:bg-secondary enabled:focus:bg-secondary',
        !isOutlined && 'text-white enabled:hover:opacity-75 enabled:focus:opacity-75',
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
