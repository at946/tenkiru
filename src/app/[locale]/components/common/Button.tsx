import clsx from 'clsx';
import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isOutlined?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Button: NextPage = (props: Props) => {
  return (
    <button
      className={clsx(
        'rounded-full border border-primary px-4 py-2 drop-shadow-md enabled:hover:drop-shadow-lg enabled:focus:drop-shadow-lg disabled:cursor-not-allowed disabled:opacity-50',
        props.isOutlined
          ? 'bg-white text-purple-600 enabled:hover:bg-purple-600 enabled:hover:text-white enabled:focus:bg-purple-600 enabled:focus:text-white'
          : 'bg-primary text-white enabled:hover:opacity-75 enabled:focus:opacity-75',
        props.className,
      )}
      disabled={props.disabled}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      {props.children}
    </button>
  );
};

export default Button;
