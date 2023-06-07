import { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { Member } from '@/interfaces/member';
import NominateButton from './NominateButton';
import BlankCard from './BlankCard';
import TableCard from './TableCard';

interface Props {
  player: Member;
  nominate: (memberId: string) => void;
}

const TableCardGroup: NextPage<Props> = ({ player, nominate }) => {
  const isCardBlank: boolean = player.selectedCard === null;
  const isCardOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);
  const cardStatus = player.selectedCard === null ? 'blank' : isCardOpen ? 'faceUp' : 'faceDown';

  return (
    <div role='group' aria-label='テーブルカードグループ'>
      <div className='mb-2 flex justify-center'>
        {isCardBlank ? (
          <BlankCard />
        ) : (
          <TableCard value={player.selectedCard} isOpen={isCardOpen} />
        )}
      </div>
      <div className='text-center'>
        <NominateButton isDisabled={cardStatus !== 'faceUp'} nominate={() => nominate(player.id)} />
      </div>
    </div>
  );
};

export default TableCardGroup;
