import { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { Member } from '@/interfaces/member';
import TableCard from './tableCard';
import NominateButton from './nominateButton';

interface Props {
  player: Member;
  nominate: (memberId: string) => void;
}

const TableCardGroup: NextPage<Props> = ({ player, nominate }) => {
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);
  const cardStatus = player.selectedCard === null ? 'blank' : cardsAreOpen ? 'open' : 'close';

  return (
    <div data-testid='tableCardGroup'>
      <TableCard card={player.selectedCard} cardStatus={cardStatus} />
      {cardStatus === 'open' && <NominateButton nominate={() => nominate(player.id)} />}
    </div>
  );
};

export default TableCardGroup;
