import { NextPage } from 'next';

// interface
import { IFTableCard } from '@/interfaces/tableCard';
import { IFUser } from '@/interfaces/user';

// components
import Button from '@/app/components/common/Button';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandsPraying, faReply } from '@fortawesome/free-solid-svg-icons';

// redux
import { useAppSelector } from '@/store/hooks';

// utils
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';

interface Props {
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButtons: NextPage<Props> = ({ clickOpenButton, clickReplayButton }) => {
  const isOpenPhase: boolean = useAppSelector((state) => state.room.room.isOpenPhase);
  const users: IFUser[] = useAppSelector((state) => state.room.room.users);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(users);
  const isEveryoneSelectedCard: boolean = !tableCards.find(
    (tableCard: IFTableCard) => tableCard.value === null,
  );
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
        <>
          <Button disabled={isOpenButtonDisabled} extraClass='mr-2' onClick={clickOpenButton}>
            <FontAwesomeIcon icon={faHand} className='mr-2' />
            <span>開く</span>
          </Button>
          <Button isOutlined={true} disabled={isEveryoneSelectedCard}>
            <FontAwesomeIcon icon={faHandsPraying} className='mr-2' />
            <span>早く選んで</span>
          </Button>
        </>
      )}
    </div>
  );
};
export default TableButtons;
