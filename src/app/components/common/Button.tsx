import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isOutlined?: boolean;
  disabled?: boolean;
  extraClass?: string;
  onClick?: () => void;
}

const Button: NextPage<Props> = ({ children, isOutlined, disabled, extraClass, onClick }) => {
  return (
    <button
      className={`
      rounded-full border border-purple-600 px-4 py-2 outline-none drop-shadow-md enabled:hover:drop-shadow-lg enabled:focus:drop-shadow-lg disabled:cursor-not-allowed disabled:opacity-50
      ${
        isOutlined
          ? 'bg-white text-purple-600 enabled:hover:bg-purple-600 enabled:hover:text-white enabled:focus:bg-purple-600 enabled:focus:text-white'
          : 'bg-purple-600 text-white enabled:hover:border-purple-700 enabled:hover:bg-purple-700 enabled:focus:bg-purple-700'
      }
      ${extraClass || ''}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
