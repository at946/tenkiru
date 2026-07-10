import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import TableActions from '@/app/[locale]/rooms/[roomId]/components/table/TableActions';
import TableFrame from '@/app/[locale]/rooms/[roomId]/components/table/TableFrame';
import roomAtom from '@/jotai/atoms/roomAtom';
import SummaryTags from './SummaryTags';
import TableBoard from './TableBoard';
import TableCards from './TableCards';

type Props = ComponentPropsWithoutRef<'div'> & {
  openCards: () => void;
  requestToSelect: () => void;
  replay: () => void;
};

const Table = ({ openCards, requestToSelect, replay, className, ...props }: Props) => {
  const t = useTranslations('Room.Table');
  const room = useAtomValue(roomAtom);

  return (
    <div role='img' aria-label={t('Table')} className={className} {...props}>
      <TableFrame>
        <TableBoard>
          {room.deckType !== 'tShirtSize' && <SummaryTags className='mb-5' />}

          <TableCards />
          <TableActions openCards={openCards} requestToSelect={requestToSelect} replay={replay} />
        </TableBoard>
      </TableFrame>
    </div>
  );
};

export default Table;
