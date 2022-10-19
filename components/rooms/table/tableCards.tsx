import { NextPage } from 'next';
import TableCard from './tableCard';
import { Member } from '../../../interfaces/member';
import { useAppSelector } from '../../../store/hooks';

const TableCards: NextPage = () => {
  const members: Member[] = useAppSelector(state => state.members.members)
  const players: Member[] = members.filter((v) => v.type === 'player');
  
  return (
    <div className='is-flex is-flex-wrap-wrap is-justify-content-center'>
      {players.map((player) => (
        <TableCard
          key={player.id}
          card={player.selectedCard}
        />
      ))}
    </div>
  );
};

export default TableCards;
