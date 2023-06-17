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
        <SummaryTag
          name='最小'
          value={areOpen ? getMinValueAmongTableCards(tableCards) : '?'}
          ariaLabel='最小値'
        />
        <SummaryTag
          name='平均'
          value={areOpen ? getMaxValueAmongTableCards(tableCards) : '?'}
          ariaLabel='平均値'
        />
        <SummaryTag
          name='最大'
          value={areOpen ? getAvgValueAmongTableCards(tableCards) : '?'}
          ariaLabel='最大値'
        />
      </div>
    </div>
  );
};

export default SummaryTags;
