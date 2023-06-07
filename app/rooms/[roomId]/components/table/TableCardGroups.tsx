import { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { Member } from '@/interfaces/member';
import TableCardGroup from './TableCardGroup';

interface Props {
  extraClass?: string;
  nominate: (memberId: string) => void;
}

const TableCardGroups: NextPage<Props> = ({ extraClass, nominate }) => {
  const members: Member[] = useAppSelector((state) => state.members.members);
  const players: Member[] = members.filter((v) => v.type === 'player');

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${extraClass || ''}`}>
      {players.map((player) => (
        <TableCardGroup player={player} nominate={nominate} key={player.id} />
      ))}
    </div>
  );
};

export default TableCardGroups;
