import { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { Member } from '@/interfaces/member';
import TableCardGroup from './TableCardGroup';
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import useRoom from '@/hooks/useRoom';
import { Card } from '@/class/card';

interface Props {
  extraClass?: string;
  nominate: (memberId: string) => void;
}

const TableCardGroups: NextPage<Props> = ({ extraClass, nominate }) => {
  const room: Room = useRoom();
  const table: Table = room.getTable();
  const cards: Card[] = table.getCards();

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${extraClass || ''}`}>
      {cards.map((card, index) => (
        <TableCardGroup card={card} nominate={nominate} key={index} />
      ))}
    </div>
  );
};

export default TableCardGroups;
