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

interface Props {
  card: CTableCard;
  nominate: (memberId: string) => void;
}

const TableCardGroup: NextPage<Props> = ({ player, nominate }) => {
  const isCardBlank: boolean = player.selectedCard === null;
  const isCardOpen: boolean = useAppSelector((state) => state.room.areCardsOpen);
  const cardStatus = player.selectedCard === null ? 'blank' : isCardOpen ? 'faceUp' : 'faceDown';

  return (
    <div role='group' aria-label='テーブルカードグループ'>
      <div className='mb-2 flex justify-center'>
        {isCardBlank ? <BlankCard /> : <TableCard value={card.getValue()} isOpen={isCardOpen} />}
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
