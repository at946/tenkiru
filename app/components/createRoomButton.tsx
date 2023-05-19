'use client';

import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { event } from '@/lib/gtag';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';

const CreateRoomButton: NextPage = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const roomId: string = v4();
  const router = useRouter();
  const click = (): void => {
    event({ action: 'create_room', category: 'engagement', label: '' });
    router.push(`/rooms/${encodeURIComponent(v4())}`);
  };

  return (
    <button
      className='rounded-full border-2 border-purple-600 px-4 py-2 text-purple-600 hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white'
      onClick={click}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <FontAwesomeIcon icon={isHovering ? faDoorOpen : faDoorClosed} className='mr-2' />
      <span>部屋をつくる</span>
    </button>
  );
};

export default CreateRoomButton;
