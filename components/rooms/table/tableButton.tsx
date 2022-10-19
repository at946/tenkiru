import { NextPage } from 'next';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  openButtonIsClickable: boolean;
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButton: NextPage<Props> = ({
  openButtonIsClickable,
  clickOpenButton,
  clickReplayButton,
}) => {
  const cardsAreOpen = useAppSelector(state => state.room.cardsAreOpen)
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
          disabled={!openButtonIsClickable}
          data-testid='openButton'
        >
          Open
        </button>
      )}
    </div>
  );
};

export default TableButton;
