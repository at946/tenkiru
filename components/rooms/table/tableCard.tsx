import { NextPage } from 'next';
import Card from '../card';
import styles from './tableCard.module.scss';
import { Card as IFCard } from '../../../interfaces/card';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  card: IFCard;
}

const TableCard: NextPage<Props> = ({ card }) => {
  let displayCard: IFCard = '';
  let additionalClassName: string = '';
  const isBlank = card === null;
  const isOpen = useAppSelector((state) => state.room.cardsAreOpen);

  if (isBlank) {
    additionalClassName = styles.blank;
  } else {
    if (isOpen) {
      displayCard = card;
      additionalClassName = 'tableCard_open';
    } else {
      additionalClassName = styles.close;
    }
  }

  return <Card value={displayCard} additionalClassName={additionalClassName} testId='tableCard' />;
};

export default TableCard;
