import Button from '@/app/[locale]/components/common/Button';
import { IFRoom } from '@/interfaces/room';
import { IFTableCard } from '@/interfaces/tableCard';
import roomState from '@/recoil/atoms/roomAtom';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';
import TableCard from './TableCard';

interface Props {
  nominate: (userId: string) => void;
}

const TableCards: NextPage<Props> = ({ nominate }) => {
  const room: IFRoom = useRecoilValue(roomState);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);

  return (
    <div className='mb-5 flex flex-wrap justify-center gap-4'>
      {tableCards.map((tableCard: IFTableCard) => {
        const isTableCardBlank: boolean = tableCard.value === null;

        return (
          <div key={tableCard.userId} role='group' aria-label='テーブルカードグループ'>
            <div className='mb-2 flex justify-center'>
              <TableCard value={tableCard.value} isOpen={room.isOpenPhase} />
            </div>

            <div className='text-center'>
              <Button
                isOutlined={true}
                disabled={!room.isOpenPhase || isTableCardBlank}
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
