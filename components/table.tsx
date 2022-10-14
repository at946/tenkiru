import { NextPage } from 'next';
import TableCard from './tableCard';
import { Member } from '../interfaces/member'

interface Props {
  members: Member[];
  cardsAreOpen: boolean;
  openCardsOnTable: () => void;
  cleanCardsOnTable: () => void;
}

const Table: NextPage<Props> = ({
  members,
  cardsAreOpen,
  openCardsOnTable,
  cleanCardsOnTable,
}) => {
  const players = members.filter(v => v.type === 'player')

  const open = (): void => {
    openCardsOnTable();
  };

  const replay = (): void => {
    cleanCardsOnTable();
  };

  return (
    <div className='box has-background-success'>
      <div className='is-flex is-flex-wrap-wrap is-justify-content-center mb-4'>
        {players.map(player => (
          <TableCard
            key={player.id}
            putDown={player.card !== null}
            isOpen={cardsAreOpen}
            card={player.card}
          />
        ))}
      </div>
      {cardsAreOpen ? (
        <button
          className='button is-rounded is-light is-primary'
          onClick={replay}
          data-testid='replayButton'
        >
          Replay
        </button>
      ) : (
        <button
          className='button is-rounded is-light is-primary'
          onClick={open}
          data-testid='openButton'
        >
          Open
        </button>
      )}
    </div>
  );
};

export default Table;
