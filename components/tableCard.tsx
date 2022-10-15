import { NextPage } from 'next';
import Card from './card';
import styles from './tableCard.module.scss';
import { Card as IFCard } from '../interfaces/card';

interface Props {
  putDown: boolean;
  isOpen: boolean;
  card: IFCard;
}

const TableCard: NextPage<Props> = ({ putDown, isOpen, card }) => {
  let displayCard: IFCard = '';
  let additionalClassName: string = '';

  if (putDown) {
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
