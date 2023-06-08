import { NextPage } from 'next';
import { Member } from '@/interfaces/member';
import { useAppSelector } from '@/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faPlay, faReply } from '@fortawesome/free-solid-svg-icons';
import Button from '@/app/components/common/Button';

interface Props {
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButton: NextPage<Props> = ({ clickOpenButton, clickReplayButton }) => {
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);
  const members: Member[] = useAppSelector((state) => state.members.members);
  const players: Member[] = members.filter((v) => v.type === 'player');
  const noCardPutOnTable: boolean = !players.find((v) => v.selectedCard !== null);

  return (
    <div>
      {cardsAreOpen ? (
        <Button label='もう一度' icon={faReply} onClick={clickReplayButton} />
      ) : (
        <Button label='開く' icon={faHand} disabled={noCardPutOnTable} onClick={clickOpenButton} />
      )}
    </div>
  );
};

export default TableButton;
