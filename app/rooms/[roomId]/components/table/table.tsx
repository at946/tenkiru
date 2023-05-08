import { NextPage } from 'next';
import TableButton from './tableButton';
import SummaryTags from './summaryTags';
import TableCardGroups from './tableCardGroups';
import { useAppSelector } from '@/store/hooks';

interface Props {
  openCards: () => void;
  replay: () => void;
  nominate: (memberId: string) => void;
}

const Table: NextPage<Props> = ({ openCards, replay, nominate }) => {
  const deckType: string = useAppSelector((state) => state.room.deckType);

  return (
    <div className='box has-background-success is-shadowless'>
      <TableCardGroups className='mb-5' nominate={nominate} />
      {deckType !== 'tShirtSize' && <SummaryTags className='mb-4' />}
      <TableButton clickOpenButton={openCards} clickReplayButton={replay} />
    </div>
  );
};

export default Table;
