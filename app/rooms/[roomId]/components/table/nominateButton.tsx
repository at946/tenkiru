import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { event } from '@/lib/gtag';
import { toast } from 'bulma-toast';

interface Props {
  isDisabled: boolean;
  nominate: () => void;
}

const NominateButton: NextPage<Props> = ({ isDisabled, nominate }) => {
  const onClick = (): void => {
    nominate();
    toast({
      message: '指名しました！',
      type: 'is-info',
      position: 'bottom-right',
    });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <button
      className='rounded border-2 border-white bg-white px-2 py-1 text-sm shadow outline-none hover:border-purple-600 hover:text-purple-600 hover:shadow-md focus:border-purple-600 focus:text-purple-600 focus:shadow-md disabled:opacity-50'
      disabled={isDisabled}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faComment} className='mr-1' />
      <span>指名</span>
    </button>
  );
};

export default NominateButton;
