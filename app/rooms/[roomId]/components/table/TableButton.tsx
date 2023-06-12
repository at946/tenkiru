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
  const areCardsOpen: boolean = useAppSelector((state) => state.room.areCardsOpen);
  const members: Member[] = useAppSelector((state) => state.members.members);
  const players: Member[] = members.filter((v) => v.type === 'player');
  const noCardPutOnTable: boolean = !players.find((v) => v.selectedCard !== null);

  return (
    <div>
      {areCardsOpen ? (
        <Button onClick={clickReplayButton}>
          <FontAwesomeIcon icon={faReply} className='mr-2' />
          <span>もう一度</span>
        </Button>
      ) : (
        <Button disabled={noCardPutOnTable} onClick={clickOpenButton}>
          <FontAwesomeIcon icon={faHand} className='mr-2' />
          <span>開く</span>
        </Button>
      )}
    </div>
  );
};

export default TableButton;
