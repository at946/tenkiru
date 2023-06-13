import { NextPage } from 'next';
import { Member } from '@/interfaces/member';
import { useAppSelector } from '@/store/hooks';
import SummaryTag from './SummaryTag';
import { Card } from '@/class/card';
import { Room } from '@/class/room';
import useRoom from '@/hooks/useRoom';
import { Table } from '@/class/table';
import { Cards } from '@/class/cards';

interface Props {
  extraClass?: string;
}

const SummaryTags: NextPage<Props> = ({ extraClass }) => {
  const room: Room = useRoom();
  const table: Table = room.getTable();
  const cards: Cards = table.getCards();
  const cardsAreOpen = table.areCardsOpen();
  const useCalculatedResult = cardsAreOpen && cards.areNumberCardsExist();

  const minValue: number | string = useCalculatedResult ? cards.getMin() : '?';
  const maxValue: number | string = useCalculatedResult ? cards.getMax() : '?';
  const avgValue: number | string = useCalculatedResult ? cards.getAverage() : '?';

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
