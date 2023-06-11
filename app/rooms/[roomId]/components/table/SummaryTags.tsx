import { NextPage } from 'next';
import { Card } from '@/interfaces/card';
import { Member } from '@/interfaces/member';
import { useAppSelector } from '@/store/hooks';
import SummaryTag from './SummaryTag';

interface Props {
  extraClass?: string;
}

const SummaryTags: NextPage<Props> = ({ extraClass }) => {
  const members: Member[] = useAppSelector((state) => state.members.members);
  const players: Member[] = members.filter((v) => v.type === 'player');
  const cards: Card[] = players.map((v) => v.selectedCard);
  const numberCards: number[] = cards.filter<number>((v): v is number => typeof v === 'number');
  const areCardsOpen = useAppSelector((state) => state.room.areCardsOpen);
  const useCalculatedResult = areCardsOpen && numberCards.length > 0;

  const minValue: number | string = useCalculatedResult ? Math.min(...numberCards) : '?';
  const maxValue: number | string = useCalculatedResult ? Math.max(...numberCards) : '?';
  const avgValue: number | string = useCalculatedResult
    ? Math.round((numberCards.reduce((a, b) => a + b, 0) / numberCards.length) * 10) / 10
    : '?';

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
