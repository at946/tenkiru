import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Button from '@/app/[locale]/components/common/Button';
import getTableCardsFromUsers from '@/app/[locale]/rooms/[roomId]/utils/getTableCardsFromUsers';
import type { IFRoom } from '@/interfaces/room';
import type { IFTableCard } from '@/interfaces/tableCard';
import roomState from '@/jotai/atoms/roomAtom';
import SummaryTags from './SummaryTags';
import TableCards from './TableCards';

interface Props {
  className?: string;
  openCards: () => void;
  requestToSelect: () => void;
  replay: () => void;
  nominate: (userId: string) => void;
}

const Table: NextPage<Props> = ({ className, openCards, requestToSelect, replay, nominate }) => {
  const room: IFRoom = useAtomValue(roomState);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);
  const allCardsAreNotSelected: boolean =
    tableCards.filter((tableCard: IFTableCard) => tableCard.value !== null).length === 0;
  const allCardsAreSelected: boolean = !tableCards.find((tableCard: IFTableCard) => tableCard.value === null);

  const t = useTranslations('Room.Table');

  return (
    <div className={clsx('rounded-sm bg-green-400 py-5 text-center shadow-md', className)}>
      {room.deckType !== 'tShirtSize' && <SummaryTags className='mb-5' />}

      <TableCards nominate={nominate} />

      <div className='flex justify-center gap-2'>
        {!room.isOpenPhase && (
          <Button disabled={allCardsAreNotSelected} color='secondary' onClick={openCards}>
            <span className='icon-[fa6-solid--hand]' />
            <span>{t('Open')}</span>
          </Button>
        )}
        {!room.isOpenPhase && (
          <Button isOutlined={true} disabled={allCardsAreSelected} color='secondary' onClick={requestToSelect}>
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
    </div>
  );
};

export default Table;
