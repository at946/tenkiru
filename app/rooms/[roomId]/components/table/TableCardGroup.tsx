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
          isDisabled={!isCardOpen && isCardBlank}
          nominate={() => nominate(player.id)}
        />
      </div>
    </div>
  );
};

export default TableCardGroup;
