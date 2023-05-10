import { NextPage } from 'next';
import { Member } from '@/interfaces/member';
import { useAppSelector } from '@/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faPlay, faReply } from '@fortawesome/free-solid-svg-icons';

interface Props {
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButton: NextPage<Props> = ({ clickOpenButton, clickReplayButton }) => {
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);
  const members: Member[] = useAppSelector((state) => state.members.members);
  const players: Member[] = members.filter((v) => v.type === 'player');
  const noCardPutOnTable: boolean = !players.find((v) => v.selectedCard !== null);

  return (
    <div>
      {cardsAreOpen ? (
        <button
          className='button is-rounded is-primary is-inverted'
          onClick={clickReplayButton}
          data-testid='replayButton'
        >
          <FontAwesomeIcon icon={faReply} className='mr-2' />
          <span>もう一度</span>
        </button>
      ) : (
        <button
          className='button is-rounded is-primary'
          onClick={clickOpenButton}
          disabled={noCardPutOnTable}
          data-testid='openButton'
        >
          <FontAwesomeIcon icon={faHand} className='mr-2' />
          <span>開く</span>
        </button>
      )}
    </div>
  );
};

export default TableButton;
