'use client';

import { event } from '@/lib/gtag';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 } from 'uuid';
import Button from './common/Button';

interface Props {
  name: string;
}

const CreateRoomButton: NextPage = (props: Props) => {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const click = (): void => {
    event({ action: 'create_room', category: 'engagement', label: '' });
    router.push(`/rooms/${encodeURIComponent(v4())}`);
  };

  return (
    <Button
      onClick={click}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
    >
      <span
        className={clsx(
          'mr-2',
          isHovering ? 'icon-[fa6-solid--door-open]' : 'icon-[fa6-solid--door-closed]',
        )}
      />
      <span>{props.name}</span>
    </Button>
  );
};

export default CreateRoomButton;
