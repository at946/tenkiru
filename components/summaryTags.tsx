import { NextPage } from 'next';
import SummaryTag from './summaryTag';

interface Props {
  minCard: number;
  avgValue: number;
  maxCard: number;
}

const SummaryTags: NextPage<Props> = ({ minCard, avgValue, maxCard }) => {
  return (
    <div className='mx-auto'>
      <div className='field is-grouped is-grouped-multiline is-grouped-centered'>
        <SummaryTag name='Min' value={minCard} testid='min' />
        <SummaryTag name='Avg' value={avgValue} testid='avg' />
        <SummaryTag name='Max' value={maxCard} testid='max' />
      </div>
    </div>
  );
};

export default SummaryTags;
