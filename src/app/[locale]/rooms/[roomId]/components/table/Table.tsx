import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import TableActions from '@/app/[locale]/rooms/[roomId]/components/table/TableActions';
import TableFrame from '@/app/[locale]/rooms/[roomId]/components/table/TableFrame';
import type { IFRoom } from '@/interfaces/room';
import roomAtom from '@/jotai/atoms/roomAtom';
import SummaryTags from './SummaryTags';
import TableBoard from './TableBoard';
import TableCards from './TableCards';

interface Props {
  className?: string;
  openCards: () => void;
  requestToSelect: () => void;
  replay: () => void;
  nominate: (userId: string) => void;
}

const Table: NextPage<Props> = ({ className, openCards, requestToSelect, replay, nominate }) => {
  const room: IFRoom = useAtomValue(roomAtom);

  const t = useTranslations('Room.Table');

  return (
    <div role='img' aria-label={t('Table')} className={className}>
      <TableFrame>
        <TableBoard>
          {room.deckType !== 'tShirtSize' && <SummaryTags className='mb-5' />}

          <TableCards nominate={nominate} />
          <TableActions openCards={openCards} requestToSelect={requestToSelect} replay={replay} />
        </TableBoard>
      </TableFrame>
    </div>
  );
};

export default Table;
