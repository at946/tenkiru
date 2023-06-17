import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';

// components
import SummaryTag from './SummaryTag';

interface Props {
  extraClass?: string;
}

const SummaryTags: NextPage<Props> = ({ extraClass }) => {
  const room: Room | undefined = useRoom();

  const minValue: number | '?' = room?.getMinInTableCards() || '?';
  const maxValue: number | '?' = room?.getMaxInTableCards() || '?';
  const avgValue: number | '?' = room?.getAverageOfTableCards() || '?';

  return (
    <div className={extraClass}>
      <div className='flex justify-center gap-2'>
        <SummaryTag
          name='最小'
          value={minValue}
          isOpen={!!room?.areCardsOpen()}
          ariaLabel='最小値'
        />
        <SummaryTag
          name='平均'
          value={avgValue}
          isOpen={!!room?.areCardsOpen()}
          ariaLabel='平均値'
        />
        <SummaryTag
          name='最大'
          value={maxValue}
          isOpen={!!room?.areCardsOpen()}
          ariaLabel='最大値'
        />
      </div>
    </div>
  );
};

export default SummaryTags;
