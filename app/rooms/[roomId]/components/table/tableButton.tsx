import { NextPage } from 'next';
import { Member } from '../../../../../interfaces/member';
import { useAppSelector } from '../../../../../store/hooks';

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
          className='button is-rounded is-light is-primary'
          onClick={clickReplayButton}
          data-testid='replayButton'
        >
          Replay
        </button>
      ) : (
        <button
          className='button is-rounded is-light is-primary'
          onClick={clickOpenButton}
          disabled={noCardPutOnTable}
          data-testid='openButton'
        >
          Open
        </button>
      )}
    </div>
  );
};

export default TableButton;
