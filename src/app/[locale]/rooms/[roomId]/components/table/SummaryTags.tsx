import { IFRoom } from '@/interfaces/room';
import { IFTableCard } from '@/interfaces/tableCard';
import roomState from '@/recoil/atoms/roomAtom';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import {
  getAvgValueAmongTableCards,
  getMaxValueAmongTableCards,
  getMinValueAmongTableCards,
} from '../../utils/getSummaryAmongTableCards';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';
import SummaryTag from './SummaryTag';

interface Props {
  className?: string;
}

const SummaryTags: NextPage<Props> = (props: Props) => {
  const t = useTranslations('Room.Table');
  const room: IFRoom = useRecoilValue(roomState);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);

  return (
    <div className={props.className}>
      <div className='flex justify-center gap-2'>
        <SummaryTag
          name={t('Min')}
          value={room.isOpenPhase ? getMinValueAmongTableCards(tableCards) : '?'}
        />
        <SummaryTag
          name={t('Avg')}
          value={room.isOpenPhase ? getAvgValueAmongTableCards(tableCards) : '?'}
        />
        <SummaryTag
          name={t('Max')}
          value={room.isOpenPhase ? getMaxValueAmongTableCards(tableCards) : '?'}
        />
      </div>
    </div>
  );
};

export default SummaryTags;
