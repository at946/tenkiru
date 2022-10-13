import { NextPage } from 'next';
import Card from './card';
import styles from './tableCard.module.scss';

interface Props {
  putDown: boolean;
  isOpen: boolean;
  value: number | string | null;
}

const TableCard: NextPage<Props> = ({ putDown, isOpen, value }) => {
  let displayValue: number | string | null = ''
  let additionalClassName: string = ''

  if (putDown) {
    if (isOpen) {
      displayValue = value
      additionalClassName = 'tableCard_open'
    } else {
      additionalClassName = styles.close
    }
  } else {
    additionalClassName = styles.blank
  }

  return <Card value={displayValue} additionalClassName={additionalClassName} testId='tableCard' />
};

export default TableCard;
