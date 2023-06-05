import { NextPage } from 'next';
import TableButton from './TableButton';
import SummaryTags from './SummaryTags';
import TableCardGroups from './TableCardGroups';
import { useAppSelector } from '@/store/hooks';

interface Props {
  extraClass: string;
  openCards: () => void;
  replay: () => void;
  nominate: (memberId: string) => void;
}

const Table: NextPage<Props> = ({ extraClass, openCards, replay, nominate }) => {
  const deckType: string = useAppSelector((state) => state.room.deckType);

  return (
    <div className={`rounded bg-green-400 py-5 shadow-md ${extraClass}`}>
      {deckType !== 'tShirtSize' && <SummaryTags extraClass='mb-4' />}
      <TableCardGroups extraClass='mb-5' nominate={nominate} />
      <TableButton clickOpenButton={openCards} clickReplayButton={replay} />
    </div>
  );
};

export default Table;
