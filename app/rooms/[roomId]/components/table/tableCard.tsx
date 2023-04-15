import { NextPage } from 'next';
import Card from '../card';
import styles from './tableCard.module.scss';
import { Card as IFCard } from '@/interfaces/card';
import { useAppSelector } from '@/store/hooks';

interface Props {
  card: IFCard;
  cardStatus: string;
}

const TableCard: NextPage<Props> = ({ card, cardStatus }) => {
  let displayCard: IFCard = '';
  let additionalClassName: string = '';
  const isBlank = card === null;
  const isOpen = useAppSelector((state) => state.room.cardsAreOpen);

  switch (cardStatus) {
    case 'blank':
      additionalClassName = styles.blank;
      break;
    case 'open':
      displayCard = card;
      additionalClassName = 'tableCard_open';
      break;
    default: // close
      additionalClassName = styles.close;
  }

  return <Card value={displayCard} additionalClassName={additionalClassName} testId='tableCard' />;
};

export default TableCard;
