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
  let displayCard: IFCard;
  let additionalClassName: string;
  let ariaLabel: string;

  switch (status) {
    case 'blank':
      additionalClassName = styles.blank;
      ariaLabel = '未選択のテーブルカード';
      break;
    case 'faceUp':
      displayCard = value;
      ariaLabel = `オープンされたテーブルカード ${value}`;
      break;
    case 'faceDown':
      additionalClassName = styles['face-down'];
      ariaLabel = '伏せられたテーブルカード';
      break;
    default:
      additionalClassName = styles.blank;
      ariaLabel = '未選択のテーブルカード';
  }

  return (
    <Card value={displayCard} additionalClassName={additionalClassName} ariaLabel={ariaLabel} />
  );
};

export default TableCard;
