import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { event } from '@/lib/gtag';
import { toast } from 'bulma-toast';

interface Props {
  nominate: () => void;
}

const NominateButton: NextPage<Props> = ({ nominate }) => {
  const onClick = (): void => {
    nominate();
    toast({
      message: '指名しました！',
      type: 'is-success',
      position: 'top-center',
    });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <button
      className='button is-small is-primary is-inverted'
      onClick={onClick}
      data-testid='nominateButton'
    >
      <FontAwesomeIcon icon={faComment} className='mr-1' />
      <span>指名</span>
    </button>
  );
};

export default NominateButton;
