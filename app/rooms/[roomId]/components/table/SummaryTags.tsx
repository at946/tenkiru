import { NextPage } from 'next';

// components
import SummaryTag from './SummaryTag';
import { IFUser } from '@/interfaces/user';
import { useAppSelector } from '@/store/hooks';
import { IFTableCard } from '@/interfaces/tableCard';

// utils
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';
import {
  getAvgValueAmongTableCards,
  getMaxValueAmongTableCards,
  getMinValueAmongTableCards,
} from '../../utils/getSummaryAmongTableCards';

interface Props {
  extraClass?: string;
}

const SummaryTags: NextPage<Props> = ({ extraClass }) => {
  const users: IFUser[] = useAppSelector((state) => state.room.room.users);
  const areOpen: boolean = useAppSelector((state) => state.room.room.isOpenPhase);
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
