import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';

// components
import BlankCard from './BlankCard';
import TableCard from './TableCard';
import NominateButton from './NominateButton';
import { IFTableCard } from '@/interfaces/tableCard';

interface Props {
  card: IFTableCard;
  nominate: () => void;
}

const TableCardGroup: NextPage<Props> = ({ card, nominate }) => {
  const room: Room = useRoom();
  const isCardBlank: boolean = card.value === null;
  const isCardOpen: boolean = room.areCardsOpen();

  return (
    <div role='group' aria-label='テーブルカードグループ'>
      <div className='mb-2 flex justify-center'>
        {isCardBlank ? <BlankCard /> : <TableCard value={card.value} isOpen={isCardOpen} />}
      </div>
      <div className='text-center'>
        <NominateButton
          isDisabled={!isCardOpen || isCardBlank}
          nominate={() => nominate(card.userId)}
        />
      </div>
    </div>
  );
};

export default TableCardGroup;
