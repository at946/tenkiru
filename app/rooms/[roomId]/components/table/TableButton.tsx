import { NextPage } from 'next';

// interface
import { IFTableCard } from '@/interfaces/tableCard';
import { IFUser } from '@/interfaces/user';

// interface
import { IFTableCard } from '@/interfaces/tableCard';

// components
import Button from '@/app/components/common/Button';
import { Table } from '@/class/table';
import { Room } from '@/class/room';
import useRoom from '@/hooks/useRoom';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faReply } from '@fortawesome/free-solid-svg-icons';

// redux
import { useAppSelector } from '@/store/hooks';

// utils
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';

interface Props {
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButton: NextPage<Props> = ({ clickOpenButton, clickReplayButton }) => {
  const isOpenPhase: boolean = useAppSelector((state) => state.room.room.isOpenPhase);
  const users: IFUser[] = useAppSelector((state) => state.room.room.users);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(users);
  const isOpenButtonDisabled: boolean =
    tableCards.filter((tableCard: IFTableCard) => tableCard.value !== null).length === 0;

  return (
    <div>
      {isOpenPhase ? (
        <Button onClick={clickReplayButton}>
          <FontAwesomeIcon icon={faReply} className='mr-2' />
          <span>もう一度</span>
        </Button>
      ) : (
        <Button disabled={isOpenButtonDisabled} onClick={clickOpenButton}>
          <FontAwesomeIcon icon={faHand} className='mr-2' />
          <span>開く</span>
        </Button>
      )}
    </div>
  );
};

export default TableButton;
