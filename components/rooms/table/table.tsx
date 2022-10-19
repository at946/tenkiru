import { NextPage } from 'next';
import TableButton from './tableButton';
import SummaryTags from './summaryTags';
import TableCards from './tableCards';

interface Props {
  openCards: () => void;
  replay: () => void;
}

const Table: NextPage<Props> = ({ openCards, replay }) => {
  return (
    <div className='box has-background-success is-shadowless'>
      <div className="mb-4"><TableCards /></div>
      <div className='mb-4'><SummaryTags /></div>
      <TableButton
        clickOpenButton={openCards}
        clickReplayButton={replay}
      />
    </div>
  );
};

export default Table;
