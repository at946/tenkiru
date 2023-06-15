'use client';

import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { NextPage } from 'next';
import { useState } from 'react';
import { event } from '@/lib/gtag';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Button from './common/Button';

const CreateRoomButton: NextPage = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const router = useRouter();
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
