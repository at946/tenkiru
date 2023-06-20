'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 } from 'uuid';
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { event } from '@/lib/gtag';

import Button from './common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreateRoomButton: NextPage = () => {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const click = (): void => {
    event({ action: 'create_room', category: 'engagement', label: '' });
    router.push(`/rooms/${encodeURIComponent(v4())}`);
  };

  return (
    <span onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <Button onClick={click}>
        <FontAwesomeIcon icon={isHovering ? faDoorOpen : faDoorClosed} className='mr-2' />
        <span>部屋をつくる</span>
      </Button>
    </span>
  );
};

export default CreateRoomButton;
