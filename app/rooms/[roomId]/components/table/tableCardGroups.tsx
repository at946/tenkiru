import { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { Member } from '@/interfaces/member';
import TableCardGroup from './tableCardGroup';

interface Props {
  className?: string;
  nominate: (memberId: string) => void;
}

const TableCardGroups: NextPage<Props> = ({ className, nominate }) => {
  const members: Member[] = useAppSelector((state) => state.members.members);
  const players: Member[] = members.filter((v) => v.type === 'player');

  return (
    <div className={`is-flex is-flex-wrap-wrap is-justify-content-center ${className || ''}`}>
      {players.map((player) => (
        <TableCardGroup player={player} nominate={nominate} key={player.id} />
      ))}
    </div>
  );
};

export default TableCardGroups;
