import { NextPage } from 'next';
import Card from '../card';
import styles from './tableCard.module.scss';
import { Card as IFCard } from '@/interfaces/card';
import { useAppSelector } from '@/store/hooks';

interface Props {
  value: IFCard;
  status: string;
}

const TableCard: NextPage<Props> = ({ value, status }) => {
  let displayCard: IFCard = '';
  let additionalClassName: string = '';

  switch (status) {
    case 'blank':
      additionalClassName = styles.blank;
      break;
    case 'faceUp':
      displayCard = value;
      break;
    case 'faceDown':
      additionalClassName = styles['face-down'];
      break;
    default:
      additionalClassName = styles.blank;
  }

  return (
    <Card
      value={displayCard}
      additionalClassName={additionalClassName}
      ariaLabel={`${status}TableCard`}
    />
  );
};

export default TableCard;
