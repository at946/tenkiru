import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard } from '@/class/tableCard';

// components
import TableCardGroup from './TableCardGroup';

interface Props {
  extraClass?: string;
  nominate: (playerId: string) => void;
}

const TableCardGroups: NextPage<Props> = ({ extraClass, nominate }) => {
  const room: Room = useRoom();
  const tableCards: TableCard[] = room.getTable().getCards();

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${extraClass || ''}`}>
      {tableCards.map((tableCard: TableCard) => (
        <TableCardGroup card={tableCard} nominate={nominate} key={tableCard.getPlayerId()} />
      ))}
    </div>
  );
};

export default TableCardGroups;
