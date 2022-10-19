import { NextPage } from 'next';
import TableCard from './tableCard';
import TableButton from './tableButton';
import SummaryTags from './summaryTags';
import { Member } from '../../../interfaces/member';
import { Card } from '../../../interfaces/card';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  openCardsOnTable: () => void;
  cleanCardsOnTable: () => void;
}

const Table: NextPage<Props> = ({ openCardsOnTable, cleanCardsOnTable }) => {
  const members = useAppSelector(state => state.members.members)
  const cardsAreOpen = useAppSelector(state => state.room.cardsAreOpen)

  const players: Member[] = members.filter((v) => v.type === 'player');
  const playerCards: Card[] = players.map((v) => v.selectedCard);
  const playerNumberCards: number[] = playerCards.filter<number>(
    (v): v is number => typeof v === 'number',
  );
  const summaryTagsAreVisible: boolean = cardsAreOpen && playerNumberCards.length > 0;
  const minCard: number = Math.min(...playerNumberCards);
  const maxCard: number = Math.max(...playerNumberCards);
  const avgValue: number =
    Math.round((playerNumberCards.reduce((a, b) => a + b, 0) / playerNumberCards.length) * 10) / 10;

  const open = (): void => {
    openCardsOnTable();
  };

  const replay = (): void => {
    cleanCardsOnTable();
  };

  return (
    <div className='box has-background-success is-shadowless'>
      <div className='is-flex is-flex-wrap-wrap is-justify-content-center mb-4'>
        {players.map((player) => (
          <TableCard
            key={player.id}
            putDown={player.selectedCard !== null}
            card={player.selectedCard}
          />
        ))}
      </div>
      {summaryTagsAreVisible && (
        <div className='mb-4'>
          <SummaryTags minCard={minCard} avgValue={avgValue} maxCard={maxCard} />
        </div>
      )}
      <TableButton
        openButtonIsClickable={!!players.find((v) => v.selectedCard !== null)}
        clickOpenButton={open}
        clickReplayButton={replay}
      />
    </div>
  );
};

export default Table;
