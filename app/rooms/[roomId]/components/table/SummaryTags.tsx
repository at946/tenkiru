import { NextPage } from 'next';

// components
import SummaryTag from './SummaryTag';
import { useAppSelector } from '@/store/hooks';

// interfaces
import { IFTableCard } from '@/interfaces/tableCard';
import { IFUser } from '@/interfaces/user';

// utils
import {
  getAvgValueAmongTableCards,
  getMaxValueAmongTableCards,
  getMinValueAmongTableCards,
} from '../../utils/getSummaryAmongTableCards';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';

interface Props {
  extraClass?: string;
}

const SummaryTags: NextPage<Props> = ({ extraClass }) => {
  const areOpen: boolean = useAppSelector((state) => state.room.room.isOpenPhase);
  const users: IFUser[] = useAppSelector((state) => state.room.room.users);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(users);

  return (
    <div className={extraClass}>
      <div className='flex justify-center gap-2'>
        <SummaryTag name='最小' value={areOpen ? getMinValueAmongTableCards(tableCards) : '?'} />
        <SummaryTag name='平均' value={areOpen ? getAvgValueAmongTableCards(tableCards) : '?'} />
        <SummaryTag name='最大' value={areOpen ? getMaxValueAmongTableCards(tableCards) : '?'} />
      </div>
    </div>
  );
};

export default SummaryTags;
