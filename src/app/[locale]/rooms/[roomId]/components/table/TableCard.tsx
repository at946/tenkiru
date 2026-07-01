import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import PokerCardBack from '../poker-card/PokerCardBack';
import PokerCardFront from '../poker-card/PokerCardFront';
import TableCardSlot from './TableCardSlot';

interface Props {
  value: IFTableCardValue;
  isOpen?: boolean;
}

const TableCard: NextPage<Props> = ({ value, isOpen = false }) => {
  const t = useTranslations('Room.Table');
  const isBlank: boolean = value === null;

  return (
    <TableCardSlot aria-label={isBlank ? t('Unselected table card') : ''}>
      {!isBlank && (isOpen ? <PokerCardFront value={value} /> : <PokerCardBack />)}
    </TableCardSlot>
  );
};

export default TableCard;
