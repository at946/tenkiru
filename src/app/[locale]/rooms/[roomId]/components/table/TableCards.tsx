import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import toast from 'react-hot-toast';
import Button from '@/app/[locale]/components/common/Button';
import TableCardSlot from '@/app/[locale]/rooms/[roomId]/components/table/TableCardSlot';
import type { IFTableCard } from '@/interfaces/tableCard';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';
import TableCard from './TableCard';

type Props = ComponentPropsWithoutRef;

const TableCards = ({ className, ...props }: Props) => {
  const tTable = useTranslations('Room.Table');
  const tRoom = useTranslations('Room');
  const room = useAtomValue(roomAtom);
  const socket = useAtomValue(socketAtom);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);

  const nominate = (memberId: string): void => {
    socket.emit('nominate', memberId);
    toast.success(tRoom('Asked a player for comment'), {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <div {...props} className={clsx('mb-5 flex flex-wrap justify-center gap-4', className)}>
      {tableCards.map((tableCard: IFTableCard, index: number) => {
        const isSet: boolean = tableCard.value !== null;

        return (
          <fieldset key={tableCard.userId} aria-label={tTable('Table cards group')}>
            <div className='mb-2 flex justify-center'>
              <TableCardSlot>
                {isSet && <TableCard value={tableCard.value} isOpen={room.isOpenPhase} delay={index * 0.1} />}
              </TableCardSlot>
            </div>

            <div className='text-center'>
              <Button
                isOutlined={true}
                color='secondary'
                disabled={!room.isOpenPhase || !isSet}
                onClick={() => nominate(tableCard.userId)}
                className='text-sm'
                title={tTable('Get comments')}
                ariaLabel={tTable('Get comments')}
              >
                <span className='icon-[fa6-solid--comment]' />
              </Button>
            </div>
          </fieldset>
        );
      })}
    </div>
  );
};

export default TableCards;
