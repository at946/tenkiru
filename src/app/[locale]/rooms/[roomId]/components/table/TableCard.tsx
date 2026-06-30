import type { NextPage } from 'next';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import PokerCardBack from '../poker-card/PokerCardBack';
import PokerCardFront from '../poker-card/PokerCardFront';
import TableCardSlot from './TableCardSlot';

interface Props {
  value: IFTableCardValue;
  isOpen?: boolean;
}

const TableCard: NextPage<Props> = ({ value, isOpen = false }) => {
  const isBlank: boolean = value === null;

  return <TableCardSlot>{!isBlank && (isOpen ? <PokerCardFront value={value} /> : <PokerCardBack />)}</TableCardSlot>;
};

export default TableCard;
