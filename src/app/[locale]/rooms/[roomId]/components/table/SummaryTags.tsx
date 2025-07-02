import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import type { IFRoom } from '@/interfaces/room';
import type { IFTableCard } from '@/interfaces/tableCard';
import roomState from '@/jotai/atoms/roomAtom';
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

const SummaryTags: NextPage<Props> = ({ className }) => {
  const t = useTranslations('Room.Table');
  const room: IFRoom = useAtomValue(roomState);
  const tableCards: IFTableCard[] = getTableCardsFromUsers(room.users);

  return (
    <div className={className}>
      <div className='inline-flex gap-2'>
        <SummaryTag name={t('Min')} value={room.isOpenPhase ? getMinValueAmongTableCards(tableCards) : '?'} />
        <SummaryTag name={t('Avg')} value={room.isOpenPhase ? getAvgValueAmongTableCards(tableCards) : '?'} />
        <SummaryTag name={t('Max')} value={room.isOpenPhase ? getMaxValueAmongTableCards(tableCards) : '?'} />
      </div>
    </div>
  );
};

export default SummaryTags;
