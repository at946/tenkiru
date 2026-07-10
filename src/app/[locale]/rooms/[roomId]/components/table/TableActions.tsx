import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import Button from '@/app/[locale]/components/common/Button';
import type { IFRoom } from '@/interfaces/room';
import type { IFUser } from '@/interfaces/user';
import roomAtom from '@/jotai/atoms/roomAtom';

type Props = ComponentPropsWithoutRef<'div'> & {
  openCards: () => void;
  requestToSelect: () => void;
  replay: () => void;
};

const TableActions = ({ openCards, requestToSelect, replay, className, ...props }: Props) => {
  const t = useTranslations('Room.Table');

  const room: IFRoom = useAtomValue(roomAtom);
  const users: IFUser[] = room.users;
  const players: IFUser[] = users.filter((user) => user.type === 'player');
  const readyPlayers: IFUser[] = players.filter((player) => player.selectedCardValue !== null);

  return (
    <div className={clsx('flex justify-center gap-2', className)} {...props}>
      {!room.isOpenPhase && (
        <Button disabled={readyPlayers.length === 0} color='secondary' onClick={openCards}>
          <span className='icon-[fa6-solid--hand]' />
          <span>{t('Open')}</span>
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
          <span>{t('Ask to choose')}</span>
        </Button>
      )}
      {room.isOpenPhase && (
        <Button color='secondary' onClick={replay}>
          <span className='icon-[fa6-solid--repeat]' />
          <span>{t('Again')}</span>
        </Button>
      )}
    </div>
  );
};

export default TableActions;
