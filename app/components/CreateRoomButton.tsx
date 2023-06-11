'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 } from 'uuid';
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { event } from '@/lib/gtag';

import Button from './common/Button';

const CreateRoomButton: NextPage = () => {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const roomId: string = v4();

  const click = (): void => {
    event({ action: 'create_room', category: 'engagement', label: '' });
    router.push(`/rooms/${encodeURIComponent(v4())}`);
  };

  return (
    <span onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <Button
        label='部屋をつくる'
        icon={isHovering ? faDoorOpen : faDoorClosed}
        isOutlined={true}
        onClick={click}
      />
    </span>
  );
};

export default CreateRoomButton;
