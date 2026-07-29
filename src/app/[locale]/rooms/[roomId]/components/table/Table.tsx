import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import TableActions from '@/app/[locale]/rooms/[roomId]/components/table/TableActions';
import TableFrame from '@/app/[locale]/rooms/[roomId]/components/table/TableFrame';
import roomAtom from '@/jotai/atoms/roomAtom';
import SummaryTags from './SummaryTags';
import TableBoard from './TableBoard';
import TableCards from './TableCards';

type Props = ComponentPropsWithoutRef<'div'>;

const Table = ({ className, ...props }: Props) => {
  const t = useTranslations('Room.Table');
  const room = useAtomValue(roomAtom);

  return (
    <div role='img' aria-label={t('Table')} className={className} {...props}>
      <TableFrame>
        <TableBoard>
          {room.deckType !== 'tShirtSize' && <SummaryTags className='mb-5' />}
          <TableCards className={!room.isOpenPhase ? 'mb-5' : undefined} />
          {room.isOpenPhase && (
            <p className='my-3 flex items-center justify-center gap-1.5 bg-white/50 py-2 text-gray-600 text-sm'>
              <span className='icon-[ic--baseline-ads-click] text-lg' />
              <span>{t('Select a card above to hear their thoughts')}</span>
              <span className='icon-[mdi--speak-outline] text-lg' />
            </p>
          )}
          <TableActions />
        </TableBoard>
      </TableFrame>
    </div>
  );
};

export default Table;
