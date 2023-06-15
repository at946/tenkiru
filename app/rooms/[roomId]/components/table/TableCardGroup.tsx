import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard as CTableCard } from '@/class/tableCard';

// components
import BlankCard from './BlankCard';
import TableCard from './TableCard';
import NominateButton from './NominateButton';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

interface Props {
  cardValue: IFTableCardValue;
  nominate: (memberId: string) => void;
}

const TableCardGroup: NextPage<Props> = ({ cardValue, nominate }) => {
  const room: Room = useRoom();
  const isCardBlank: boolean = cardValue === null;
  const isCardOpen: boolean = room.areCardsOpen();

  return (
    <div role='group' aria-label='テーブルカードグループ'>
      <div className='mb-2 flex justify-center'>
        {isCardBlank ? <BlankCard /> : <TableCard value={cardValue} isOpen={isCardOpen} />}
      </div>
      <div className='text-center'>
        <NominateButton
          isDisabled={!isCardOpen || isCardBlank}
          nominate={() => nominate(card.getPlayerId())}
        />
      </div>
    </div>
  );
};

export default TableCardGroup;
