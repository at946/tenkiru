import { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { Member } from '@/interfaces/member';
import TableCard from './tableCard';
import NominateButton from './nominateButton';

interface Props {
  player: Member;
  nominate: (memberId: string) => void;
}

const TableCardSet: NextPage<Props> = ({ player, nominate }) => {
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);
  const cardStatus = player.selectedCard === null ? 'blank' : cardsAreOpen ? 'faceUp' : 'faceDown';

  return (
    <div aria-label={`tableCardSet-${player.selectedCard}`}>
      <TableCard value={player.selectedCard} status={cardStatus} />
      {cardStatus === 'faceUp' && <NominateButton nominate={() => nominate(player.id)} />}
    </div>
  );
};

export default TableCardSet;
