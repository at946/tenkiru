import { IFRoom } from '@/interfaces/room';
import { IFTableCard } from '@/interfaces/tableCard';
import roomState from '@/recoil/atoms/roomAtom';
import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import {
  getAvgValueAmongTableCards,
  getMaxValueAmongTableCards,
  getMinValueAmongTableCards,
} from '../../utils/getSummaryAmongTableCards';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';
import SummaryTag from './SummaryTag';

interface Props {
  extraClass?: string;
}

const SummaryTags: NextPage<Props> = ({ extraClass }) => {
  const room: IFRoom = useRecoilValue(roomState);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);

  return (
    <div className={extraClass}>
      <div className='flex justify-center gap-2'>
        <SummaryTag
          name='最小'
          value={room.isOpenPhase ? getMinValueAmongTableCards(tableCards) : '?'}
        />
        <SummaryTag
          name='平均'
          value={room.isOpenPhase ? getAvgValueAmongTableCards(tableCards) : '?'}
        />
        <SummaryTag
          name='最大'
          value={room.isOpenPhase ? getMaxValueAmongTableCards(tableCards) : '?'}
        />
      </div>
    </div>
  );
};

export default SummaryTags;
