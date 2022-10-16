import { NextPage } from 'next';

interface Props {
  cardsAreOpen: boolean;
  openButtonIsClickable: boolean;
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButton: NextPage<Props> = ({
  cardsAreOpen,
  openButtonIsClickable,
  clickOpenButton,
  clickReplayButton,
}) => {
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
