import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { event } from '../../lib/gtag';

interface Props {
  roomId: string;
}

const CreateRoomButton: NextPage<Props> = ({ roomId }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <Link href={`/rooms/${encodeURIComponent(roomId)}`}>
      <a
        className='button is-rounded is-outlined is-primary mt-5'
        // onClick={() => event({ action: 'create_room', category: 'engagement', label: ''})}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        data-testid='createRoomButton'
      >
        <FontAwesomeIcon icon={isHovering ? faDoorOpen : faDoorClosed} className='mr-2' />
        <span>Create a room</span>
      </a>
    </Link>
  );
};

export default CreateRoomButton;
