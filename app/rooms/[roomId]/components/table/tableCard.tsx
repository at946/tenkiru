import { NextPage } from 'next';
import Card from '../card';
import styles from './tableCard.module.scss';
import { Card as IFCard } from '@/interfaces/card';
import { TableCardStatus } from '@/interfaces/tableCardStatus';
import { useAppSelector } from '@/store/hooks';

interface Props {
  value: IFCard;
  status: TableCardStatus;
}

const TableCard: NextPage<Props> = ({ value, status }) => {
  if (status === 'faceUp') {
    return <Card value={value} ariaLabel={`めくられたテーブルカード ${value}`} />;
  } else if (status === 'faceDown') {
    return <Card additionalClassName={styles['face-down']} ariaLabel='伏せられたテーブルカード' />;
  } else {
    // blank
    return <Card additionalClassName={styles.blank} ariaLabel='未選択のテーブルカード' />;
  }
};

export default TableCard;
