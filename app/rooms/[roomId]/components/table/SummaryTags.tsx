import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard } from '@/class/tableCard';

// components
import SummaryTag from './SummaryTag';

interface Props {
  extraClass?: string;
}

const SummaryTags: NextPage<Props> = ({ extraClass }) => {
  const room: Room = useRoom();
  const useCalculatedResult = room.areCardsOpen() && room.areNumberCardsExist();

  const minValue: number | '?' = useCalculatedResult ? table.getMinInTableCards() : '?';
  const maxValue: number | '?' = useCalculatedResult ? table.getMaxInTableCards() : '?';
  const avgValue: number | '?' = useCalculatedResult ? table.getAverageOfTableCards() : '?';

  return (
    <div className={extraClass}>
      <div className='flex justify-center gap-2'>
        <SummaryTag name='最小' value={minValue} ariaLabel='最小値' />
        <SummaryTag name='平均' value={avgValue} ariaLabel='平均値' />
        <SummaryTag name='最大' value={maxValue} ariaLabel='最大値' />
      </div>
    </div>
  );
};

export default SummaryTags;
