import Button from '@/app/[locale]/components/common/Button';
import type { IFRoom } from '@/interfaces/room';
import type { IFTableCard } from '@/interfaces/tableCard';
import roomState from '@/jotai/atoms/roomAtom';
import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';
import TableCard from './TableCard';

interface Props {
  nominate: (userId: string) => void;
}

const TableCards: NextPage<Props> = ({ nominate }) => {
  const t = useTranslations('Room.Table');
  const room: IFRoom = useAtomValue(roomState);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);

  return (
    <div className='mb-5 flex flex-wrap justify-center gap-4'>
      {tableCards.map((tableCard: IFTableCard) => {
        const isTableCardBlank: boolean = tableCard.value === null;
        const isAbleToGetComments: boolean = room.isOpenPhase && !isTableCardBlank;

        return (
          <fieldset key={tableCard.userId} aria-label={t('Table cards group')}>
            <div className='mb-2 flex justify-center'>
              <TableCard value={tableCard.value} isOpen={room.isOpenPhase} />
            </div>

            <div className='text-center'>
              <Button
                isOutlined={true}
                color='secondary'
                disabled={!isAbleToGetComments}
                onClick={() => nominate(tableCard.userId)}
                className='text-sm'
                title={t('Get comments')}
                ariaLabel={t('Get comments')}
              >
                <span className='icon-[fa6-solid--comment]' />
              </Button>
            </div>
          </fieldset>
        );
      })}
    </div>
  );
};

export default TableCards;
