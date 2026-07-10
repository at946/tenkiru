import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import toast from 'react-hot-toast';
import Button from '@/app/[locale]/components/common/Button';
import type { IFRoom } from '@/interfaces/room';
import type { IFUser } from '@/interfaces/user';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';

type Props = ComponentPropsWithoutRef<'div'>;

const TableActions = ({ className, ...props }: Props) => {
  const tTable = useTranslations('Room.Table');
  const tRoom = useTranslations('Room');

  const socket = useAtomValue(socketAtom);

  const room: IFRoom = useAtomValue(roomAtom);
  const users: IFUser[] = room.users;
  const players: IFUser[] = users.filter((user) => user.type === 'player');
  const readyPlayers: IFUser[] = players.filter((player) => player.selectedCardValue !== null);

  const openCards = (): void => {
    socket?.emit('open-cards', room.id);
    event({
      action: `open_with_${room.deckType}_deck`,
      category: 'engagement',
      label: '',
    });
  };

  const requestToSelect = (): void => {
    socket?.emit('request-to-select', room.id);
    toast.success(tRoom('Asked players to choose a card'), {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    event({ action: 'request-to-select', category: 'engagement', label: '' });
  };

  const replay = (): void => {
    socket?.emit('replay', room.id);
  };

  return (
    <div className={clsx('flex justify-center gap-2', className)} {...props}>
      {!room.isOpenPhase && (
        <Button disabled={readyPlayers.length === 0} color='secondary' onClick={openCards}>
          <span className='icon-[fa6-solid--hand]' />
          <span>{tTable('Open')}</span>
        </Button>
      )}
      {!room.isOpenPhase && (
        <Button
          isOutlined={true}
          disabled={readyPlayers.length === players.length}
          color='secondary'
          onClick={requestToSelect}
        >
          <span className='icon-[fa6-solid--hands-praying]' />
          <span>{tTable('Ask to choose')}</span>
        </Button>
      )}
      {room.isOpenPhase && (
        <Button color='secondary' onClick={replay}>
          <span className='icon-[fa6-solid--repeat]' />
          <span>{tTable('Again')}</span>
        </Button>
      )}
    </div>
  );
};

export default TableActions;
