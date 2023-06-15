import { NextPage } from 'next';

// hooks
import useRoom from '@/hooks/useRoom';

// class
import { Room } from '@/class/room';

// interface
import { IFTableCard } from '@/interfaces/tableCard';

// components
import Button from '@/app/components/common/Button';

// fontawesome
import { faHand, faReply } from '@fortawesome/free-solid-svg-icons';

interface Props {
  clickOpenButton: () => void;
  clickReplayButton: () => void;
}

const TableButton: NextPage<Props> = ({ clickOpenButton, clickReplayButton }) => {
  const room: Room = useRoom();
  const tableCards: IFTableCard[] = room.getTableCards();
  const notBlankTableCards: IFTableCard[] = tableCards.filter(
    (tableCard: IFTableCard) => tableCard.value !== null,
  );

  return (
    <div>
      {room.areCardsOpen() ? (
        <Button label='もう一度' icon={faReply} onClick={clickReplayButton} />
      ) : (
        <Button
          label='開く'
          icon={faHand}
          disabled={notBlankTableCards.length === 0}
          onClick={clickOpenButton}
        />
      )}
    </div>
  );
};

export default TableButton;
