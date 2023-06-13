import { NextPage } from 'next';

// components
import SummaryTags from './SummaryTags';
import TableButton from './TableButton';
import TableCards from './TableCards';

// interface
import { IFDeckType } from '@/interfaces/deckType';

// redux
import { useAppSelector } from '@/store/hooks';
import useRoom from '@/hooks/useRoom';
import { Room } from '@/class/room';

interface Props {
  extraClass?: string;
  openCards: () => void;
  replay: () => void;
  nominate: (userId: string) => void;
}

const Table: NextPage<Props> = ({ extraClass, openCards, replay, nominate }) => {
  const deckType: IFDeckType = useAppSelector((state) => state.room.room.deckType);

  return (
    <div className={`rounded bg-green-400 py-5 shadow-md ${extraClass || ''}`}>
      {deckType !== 'tShirtSize' && <SummaryTags extraClass='mb-4' />}

      <TableCards nominate={nominate} />

      <TableButton clickOpenButton={openCards} clickReplayButton={replay} />
    </div>
  );
};

export default Table;
