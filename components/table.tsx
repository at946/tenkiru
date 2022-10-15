import { NextPage } from 'next';
import TableCard from './tableCard';
import { Member } from '../interfaces/member';
import TableButton from './tableButton';
import SummaryTags from './summaryTags';
import { Card } from '../interfaces/card';

interface Props {
  members: Member[];
  cardsAreOpen: boolean;
  openCardsOnTable: () => void;
  cleanCardsOnTable: () => void;
}

const Table: NextPage<Props> = ({ members, cardsAreOpen, openCardsOnTable, cleanCardsOnTable }) => {
  const players: Member[] = members.filter((v) => v.type === 'player');
  const playerCards: Card[] = players.map((v) => v.card);
  const playerNumberCards: number[] = playerCards.filter<number>(
    (v): v is number => typeof v === 'number',
  );
  const minCard = Math.min(...playerNumberCards);
  const maxCard = Math.max(...playerNumberCards);
  const avgValue =
    Math.round((playerNumberCards.reduce((a, b) => a + b, 0) / playerNumberCards.length) * 10) / 10;

  const open = (): void => {
    openCardsOnTable();
  };

  const replay = (): void => {
    cleanCardsOnTable();
  };

  return (
    <div className='box has-background-success'>
      <div className='is-flex is-flex-wrap-wrap is-justify-content-center mb-4'>
        {players.map((player) => (
          <TableCard
            key={player.id}
            putDown={player.card !== null}
            isOpen={cardsAreOpen}
            card={player.card}
          />
        ))}
      </div>
      {cardsAreOpen && (
        <div className='mb-4'>
          <SummaryTags minCard={minCard} avgValue={avgValue} maxCard={maxCard} />
        </div>
      )}
      <TableButton
        cardsAreOpen={cardsAreOpen}
        openButtonIsClickable={!!players.find((v) => v.card !== null)}
        clickOpenButton={open}
        clickReplayButton={replay}
      />
    </div>
  );
};

export default Table;
