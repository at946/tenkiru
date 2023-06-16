import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';

// components
import TableButton from './TableButton';
import SummaryTags from './SummaryTags';
import TableCardGroups from './TableCardGroups';

interface Props {
  extraClass: string;
  openCards: () => void;
  replay: () => void;
  nominate: (memberId: string) => void;
}

const Table: NextPage<Props> = ({ extraClass, openCards, replay, nominate }) => {
  const room: Room = useRoom();
  const deckType: string = room?.getDeckType();

  return (
    <div className={`rounded bg-green-400 py-5 shadow-md ${extraClass}`}>
      {deckType !== 'tShirtSize' && <SummaryTags extraClass='mb-4' />}
      <TableCardGroups extraClass='mb-5' nominate={nominate} />
      <TableButton clickOpenButton={openCards} clickReplayButton={replay} />
    </div>
  );
};

export default Table;
