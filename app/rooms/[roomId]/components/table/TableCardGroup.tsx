import { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { Member } from '@/interfaces/member';
import NominateButton from './NominateButton';
import BlankCard from './BlankCard';
import TableCard from './TableCard';
import { Card } from '@/class/card';
import { Room } from '@/class/room';
import useRoom from '@/hooks/useRoom';
import { Table } from '@/class/table';

interface Props {
  card: Card;
  player: Member;
  nominate: (memberId: string) => void;
}

const TableCardGroup: NextPage<Props> = ({ card, player, nominate }) => {
  const room: Room = useRoom();
  const table: Table = room.getTable();
  const isCardBlank: boolean = card.isBlank();
  const isCardOpen: boolean = table.areCardsOpen();

  return (
    <div role='group' aria-label='テーブルカードグループ'>
      <div className='mb-2 flex justify-center'>
        {isCardBlank ? <BlankCard /> : <TableCard value={card.getValue()} isOpen={isCardOpen} />}
      </div>
      <div className='text-center'>
        <NominateButton
          isDisabled={!isCardOpen && isCardBlank}
          nominate={() => nominate(player.id)}
        />
      </div>
    </div>
  );
};

export default TableCardGroup;
