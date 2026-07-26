import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import type { ComponentPropsWithoutRef } from 'react';
import TableCardSlot from '@/app/[locale]/rooms/[roomId]/components/table/TableCardSlot';
import type { IFTableCard } from '@/interfaces/tableCard';
import roomAtom from '@/jotai/atoms/roomAtom';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';
import TableCard from './TableCard';

type Props = ComponentPropsWithoutRef<'div'>;

const TableCards = ({ className, ...props }: Props) => {
  const room = useAtomValue(roomAtom);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);

  return (
    <div {...props} className={clsx('mb-5 flex flex-wrap justify-center gap-4', className)}>
      {tableCards.map((tableCard: IFTableCard, index: number) => {
        const isSet: boolean = tableCard.value !== null;

        return (
          <div className='mb-2 flex justify-center' key={tableCard.userId}>
            <TableCardSlot>
              {isSet && (
                <TableCard
                  value={tableCard.value}
                  playerId={tableCard.userId}
                  isOpen={room.isOpenPhase}
                  delay={index * 0.1}
                />
              )}
            </TableCardSlot>
          </div>
        );
      })}
    </div>
  );
};

export default TableCards;
