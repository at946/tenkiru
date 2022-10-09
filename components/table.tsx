import { NextPage } from 'next';
import TableCard from './tableCard';

interface MembersCards {
  [prop: string]: number | string | null;
}

interface Props {
  membersCards: MembersCards;
  cardsAreOpen: boolean;
  openCardsOnTable: () => void;
  cleanCardsOnTable: () => void;
}

const Table: NextPage<Props> = ({
  membersCards,
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
        {Object.keys(membersCards).map((memberId) => (
          <TableCard
            key={memberId}
            putDown={membersCards[memberId] !== null}
            isOpen={cardsAreOpen}
            value={membersCards[memberId]}
          />
        ))}
      </div>
      {cardsAreOpen ? (
        <button className='button is-rounded' onClick={replay}>
          Replay
        </button>
      ) : (
        <button className='button is-rounded' onClick={open}>
          Open
        </button>
      )}
    </div>
  );
};

export default Table;
