import { NextPage } from 'next';
import TableCard from './tableCard';
import { Member } from '@/interfaces/member';
import { Card } from '@/interfaces/card';
import { useAppSelector } from '../../../../../store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const TableCards: NextPage = () => {
  const members: Member[] = useAppSelector((state) => state.members.members);
  const players: Member[] = members.filter((v) => v.type === 'player');
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen)
  const cardStatus = (card: Card): string => {
    return card === null ? 'blank' : cardsAreOpen ? 'open' : 'close'
  }

  return (
    <div className='is-flex is-flex-wrap-wrap is-justify-content-center'>
      {players.map((player) => (
        <div key={player.id} data-testid="tableCardGroup">
          <TableCard card={player.selectedCard} cardStatus={cardStatus(player.selectedCard)} />

          { cardStatus(player.selectedCard) === 'open' &&
            <button className="button is-small is-primary is-inverted" data-testid="nominateButton">
              <FontAwesomeIcon icon={faQuestion} className="mr-1" />
              <span>指名</span>
            </button>
          }
        </div>
      ))}
    </div>
  );
};

export default TableCards;
