'use client';

import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { event } from '@/lib/gtag';
import { v4 } from 'uuid';

const CreateRoomButton: NextPage = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const roomId: string = v4();

  return (
    <Link
      href={`/rooms/${encodeURIComponent(roomId)}`}
      className='button is-rounded is-outlined is-primary mt-5'
      onClick={() => event({ action: 'create_room', category: 'engagement', label: '' })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-testid='createRoomButton'
    >
      <FontAwesomeIcon icon={isHovering ? faDoorOpen : faDoorClosed} className='mr-2' />
      <span>部屋をつくる</span>
    </Link>
  );
};

export default CreateRoomButton;
