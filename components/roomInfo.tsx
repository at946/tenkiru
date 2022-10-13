import { NextPage } from 'next';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'bulma-toast';

interface Props {
  className?: string;
  roomId: string;
}

const RoomInfo: NextPage<Props> = ({ className, roomId }) => {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${roomId}`);
    toast({
      message: 'Copied!!',
      type: 'is-success',
      position: 'top-center',
    });
  };

  return (
    <p className={className}>
      <span>Room ID: </span>
      <a onClick={copyUrl}>
        <span data-testid="roomId">{roomId}</span>
        <FontAwesomeIcon icon={faArrowUpFromBracket} className='ml-2' />
      </a>
    </p>
  );
};

export default RoomInfo;
