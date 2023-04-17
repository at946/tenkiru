import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

interface Props {
  nominate: () => void;
}

const NominateButton: NextPage<Props> = ({ nominate }) => {
  return (
    <button
      className='button is-small is-primary is-inverted'
      onClick={nominate}
      data-testid='nominateButton'
    >
      <FontAwesomeIcon icon={faComment} className='mr-1' />
      <span>指名</span>
    </button>
  );
};

export default NominateButton;
