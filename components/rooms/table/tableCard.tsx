import { NextPage } from 'next';
import Card from '../card';
import styles from './tableCard.module.scss';
import { Card as IFCard } from '../../../interfaces/card';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  putDown: boolean;
  card: IFCard;
}

const TableCard: NextPage<Props> = ({ putDown, card }) => {
  let displayCard: IFCard = '';
  let additionalClassName: string = '';
  const isOpen = useAppSelector(state => state.room.cardsAreOpen)

  if (card !== null) {
    if (isOpen) {
      displayCard = card;
      additionalClassName = 'tableCard_open';
    } else {
      additionalClassName = styles.close;
    }
  } else {
    additionalClassName = styles.blank;
  }

  return <Card value={displayCard} additionalClassName={additionalClassName} testId='tableCard' />;
};

export default TableCard;
