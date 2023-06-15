import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard } from '@/class/tableCard';

// components
import TableCardGroup from './TableCardGroup';
import { IFTableCard } from '@/interfaces/tableCard';

interface Props {
  extraClass?: string;
  nominate: (playerId: string) => void;
}

const TableCardGroups: NextPage<Props> = ({ extraClass, nominate }) => {
  const room: Room = useRoom();
  const tableCards: IFTableCard[] = room.getTableCards();

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${extraClass || ''}`}>
      {tableCards.map((tableCard: IFTableCard) => (
        <TableCardGroup card={tableCard.value} nominate={nominate} key={tableCard.userId} />
      ))}
    </div>
  );
};

export default TableCardGroups;
