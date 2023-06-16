import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';

// components
import TableCardGroup from './TableCardGroup';
import { IFTableCard } from '@/interfaces/tableCard';

interface Props {
  extraClass?: string;
  nominate: () => void;
}

const TableCardGroups: NextPage<Props> = ({ extraClass, nominate }) => {
  const room: Room = useRoom();
  const tableCards: IFTableCard[] = room?.getTableCards();

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${extraClass || ''}`}>
      {tableCards?.map((tableCard: IFTableCard) => (
        <TableCardGroup card={tableCard} nominate={nominate} key={tableCard.userId} />
      ))}
    </div>
  );
};

export default TableCardGroups;
