'use client';

import clsx from 'clsx';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 } from 'uuid';
import Button from '@/app/[locale]/components/common/Button';
import { event } from '@/lib/gtag';

interface Props {
  name: string;
}

const CreateRoomButton: NextPage<Props> = ({ name }) => {
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
      <span className={clsx(isHovering ? 'icon-[fa6-solid--door-open]' : 'icon-[fa6-solid--door-closed]')} />
      <span>{name}</span>
    </Button>
  );
};

export default CreateRoomButton;
