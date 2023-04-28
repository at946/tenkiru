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
  if (status === 'blank') {
    return <Card additionalClassName={styles.blank} ariaLabel='未選択のテーブルカード' />;
  } else if (status === 'faceDown') {
    return <Card additionalClassName={styles['face-down']} ariaLabel='伏せられたテーブルカード' />;
  } else if (status === 'faceUp') {
    return <Card value={value} ariaLabel={`めくられたテーブルカード ${value}`} />;
  }
};

export default TableCard;
