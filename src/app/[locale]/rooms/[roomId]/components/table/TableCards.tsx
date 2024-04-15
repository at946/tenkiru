import Button from '@/app/components/Button';
import { IFRoom } from '@/interfaces/room';
import { IFTableCard } from '@/interfaces/tableCard';
import roomState from '@/recoil/atoms/roomAtom';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';
import TableCard from './TableCard';

interface Props {
  nominate: (userId: string) => void;
}

const TableCards: NextPage<Props> = ({ nominate }) => {
  const t = useTranslations('Room.Table');
  const room: IFRoom = useRecoilValue(roomState);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);

  return (
    <div className='mb-5 flex flex-wrap justify-center gap-4'>
      {tableCards.map((tableCard: IFTableCard) => {
        const isTableCardBlank: boolean = tableCard.value === null;
        const isAbleToGetComments: boolean = room.isOpenPhase && !isTableCardBlank;

        return (
          <div key={tableCard.userId} role='group' aria-label={t('Table cards group')}>
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
          </div>
        );
      })}
    </div>
  );
};

export default TableCards;
