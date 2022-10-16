import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  roomId: string
}

const CreateRoomButton: NextPage<Props> = ({ roomId }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <Link href={`/rooms/${encodeURIComponent(roomId)}`}>
    <a
      className='button is-rounded is-outlined is-primary mt-5'
      data-testid='createRoomButton'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <FontAwesomeIcon icon={isHovering ? faDoorOpen : faDoorClosed} className="mr-2" />
      <span>Create a room</span>
    </a>
  </Link>
);
};

export default CreateRoomButton;
