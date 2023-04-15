import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'bulma-toast';
import { event } from '@/lib/gtag';

interface Props {
  roomId: string;
}

const RoomInfo: NextPage<Props> = ({ roomId }) => {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${roomId}`);
    event({ action: 'copy_room_url', category: 'engagement', label: '' });
    toast({
      message: 'Copied!!',
      type: 'is-success',
      position: 'top-center',
    });
  };

  return (
    <p>
      <span>Room ID: </span>
      <a onClick={copyUrl}>
        <span data-testid='roomId'>{roomId}</span>
        <FontAwesomeIcon icon={faArrowUpFromBracket} className='ml-2' />
      </a>
    </p>
  );
};

export default RoomInfo;
