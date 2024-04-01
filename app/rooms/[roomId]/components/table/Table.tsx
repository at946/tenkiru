import { IFRoom } from '@/interfaces/room';
import roomState from '@/recoil/atoms/roomAtom';
import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import SummaryTags from './SummaryTags';
import TableButtons from './TableButtons';
import TableCards from './TableCards';

interface Props {
  extraClass?: string;
  openCards: () => void;
  requestToSelect: () => void;
  replay: () => void;
  nominate: (userId: string) => void;
}

const Table: NextPage<Props> = ({ extraClass, openCards, requestToSelect, replay, nominate }) => {
  const room: IFRoom = useRecoilValue(roomState);

  return (
    <div className={`rounded-xl bg-green-500 py-5 text-center shadow-md ${extraClass || ''}`}>
      {room.deckType !== 'tShirtSize' && <SummaryTags extraClass='mb-4' />}

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
