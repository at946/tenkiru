import { NextPage } from 'next';
import { Card } from '@/interfaces/card';
import styles from './card.module.scss';

interface Props {
  value?: Card;
  extraClass?: string;
  role?: string;
  ariaLabel?: string;
  ariaDisabled?: boolean;
  ariaSelected?: boolean;
}

const Card: NextPage<Props> = ({
  value,
  extraClass,
  role,
  ariaLabel,
  ariaDisabled,
  ariaSelected,
}) => {
  return (
    <div
      className={`m-2 flex items-center justify-center text-2xl font-bold ${styles.card} ${extraClass}`}
      role={role}
      aria-label={ariaLabel}
      aria-disabled={ariaDisabled}
      aria-selected={ariaSelected}
    >
      {value}
    </div>
  );
};

export default Card;
