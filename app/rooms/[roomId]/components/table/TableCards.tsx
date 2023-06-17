import { NextPage } from 'next';

// components
import TableCard from './TableCard';
import Button from '@/app/components/common/Button';

// interfaces
import { IFTableCard } from '@/interfaces/tableCard';
import { IFUser } from '@/interfaces/user';

// redux
import { useAppSelector } from '@/store/hooks';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

// utils
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';

interface Props {
  nominate: (userId: string) => void;
}

const TableCards: NextPage<Props> = ({ nominate }) => {
  const users: IFUser[] = useAppSelector((state) => state.room.room.users);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(users);
  const isOpenPhase: boolean = useAppSelector((state) => state.room.room.isOpenPhase);

  return (
    <div className='mb-5 flex flex-wrap justify-center gap-4'>
      {tableCards.map((tableCard: IFTableCard) => {
        const isTableCardBlank: boolean = tableCard.value === null;

        return (
          <div key={tableCard.userId}>
            <div className='mb-2 flex justify-center'>
              <TableCard value={tableCard.value} isOpen={isOpenPhase} />
            </div>

            <div className='text-center'>
              <Button
                isOutlined={true}
                disabled={!isOpenPhase || isTableCardBlank}
                onClick={() => nominate(tableCard.userId)}
              >
                <FontAwesomeIcon icon={faComment} className='mr-2' />
                <span>指名</span>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableCards;
