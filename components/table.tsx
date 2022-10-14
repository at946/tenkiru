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
  const open = (): void => {
    openCardsOnTable();
  };

  const replay = (): void => {
    cleanCardsOnTable();
  };

  return (
    <div className='box has-background-success'>
      <div className='is-flex is-flex-wrap-wrap is-justify-content-center mb-4'>
        {members.map((member) => (
          <TableCard
            key={member.id}
            putDown={member.card !== null}
            isOpen={cardsAreOpen}
            card={member.card}
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
