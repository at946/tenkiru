import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';

interface Props {
  label: string;
  icon?: IconDefinition;
  isOutlined?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: NextPage<Props> = ({ label, icon, isOutlined, disabled, onClick }) => {
  return (
    <button
      className={`
      rounded-full border border-purple-600 px-4 py-2 outline-none drop-shadow-md enabled:hover:drop-shadow-lg enabled:focus:drop-shadow-lg disabled:cursor-not-allowed disabled:opacity-50
      ${
        isOutlined
          ? 'bg-white text-purple-600 enabled:hover:bg-purple-600 enabled:hover:text-white enabled:focus:bg-purple-600 enabled:focus:text-white'
          : 'bg-purple-600 text-white enabled:hover:bg-purple-700 enabled:focus:bg-purple-700'
      }
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className='mr-2' />}
      {label}
    </button>
  );
};

export default Button;
