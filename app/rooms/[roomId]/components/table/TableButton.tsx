import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard } from '@/class/tableCard';

// components
import Button from '@/app/components/common/Button';

// fontawesome
import { faHand, faReply } from '@fortawesome/free-solid-svg-icons';

interface Props {
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButton: NextPage<Props> = ({ clickOpenButton, clickReplayButton }) => {
  const room: Room = useRoom();
  const table: Table = room.getTable();
  const tableCards: TableCard[] = table.getCards();

  return (
    <div>
      {table.areCardsOpen() ? (
        <Button label='もう一度' icon={faReply} onClick={clickReplayButton} />
      ) : (
        <Button
          label='開く'
          icon={faHand}
          disabled={!table.areNonBlankCardsExist()}
          onClick={clickOpenButton}
        />
      )}
    </div>
  );
};

export default TableButton;
