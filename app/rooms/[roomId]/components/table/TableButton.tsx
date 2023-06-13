import { NextPage } from 'next';
import { Member } from '@/interfaces/member';
import { useAppSelector } from '@/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faPlay, faReply } from '@fortawesome/free-solid-svg-icons';
import Button from '@/app/components/common/Button';
import { Table } from '@/class/table';
import { Room } from '@/class/room';
import useRoom from '@/hooks/useRoom';

interface Props {
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButton: NextPage<Props> = ({ clickOpenButton, clickReplayButton }) => {
  const room: Room = useRoom();
  const table: Table = room.getTable();

  return (
    <div>
      {table.areCardsOpen() ? (
        <Button label='もう一度' icon={faReply} onClick={clickReplayButton} />
      ) : (
        <Button label='開く' icon={faHand} disabled={table.areNonBlankCardsExist()} onClick={clickOpenButton} />
      )}
    </div>
  );
};

export default TableButton;
