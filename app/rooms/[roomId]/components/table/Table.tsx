import { NextPage } from 'next';

// components
import SummaryTags from './SummaryTags';
import TableButtons from './TableButtons';
import TableCards from './TableCards';

// interface
import { IFDeckType } from '@/interfaces/deckType';

// redux
import { useAppSelector } from '@/store/hooks';

interface Props {
  extraClass?: string;
  openCards: () => void;
  requestToSelect: () => void;
  replay: () => void;
  nominate: (userId: string) => void;
}

const Table: NextPage<Props> = ({ extraClass, openCards, requestToSelect, replay, nominate }) => {
  const deckType: IFDeckType = useAppSelector((state) => state.room.room.deckType);

  return (
    <div className={`rounded bg-green-400 py-5 shadow-md ${extraClass || ''}`}>
      {deckType !== 'tShirtSize' && <SummaryTags extraClass='mb-4' />}

      <TableCards nominate={nominate} />

      <TableButtons
        clickOpenButton={openCards}
        clickRequestToSelectButton={requestToSelect}
        clickReplayButton={replay}
      />
    </div>
  );
};

export default Table;
