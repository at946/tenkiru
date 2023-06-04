import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { event } from '@/lib/gtag';
import toast from 'react-hot-toast';

interface Props {
  isDisabled: boolean;
  nominate: () => void;
}

const NominateButton: NextPage<Props> = ({ isDisabled, nominate }) => {
  const onClick = (): void => {
    nominate();
    toast.success('指名しました！', {
      className: 'border-2 border-lime-500',
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <button
      className='rounded border border-white bg-white px-2 py-1 text-sm shadow outline-none enabled:hover:border-purple-600 enabled:hover:text-purple-600 enabled:hover:shadow-md enabled:focus:border-purple-600 enabled:focus:text-purple-600 enabled:focus:shadow-md disabled:opacity-50'
      disabled={isDisabled}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faComment} className='mr-1' />
      <span>指名</span>
    </button>
  );
};

export default NominateButton;
