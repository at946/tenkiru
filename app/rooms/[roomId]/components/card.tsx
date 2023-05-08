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
  const className: string = `
    is-flex
    is-justify-content-center
    is-align-items-center
    is-size-3
    has-text-weight-bold
    m-2
    ${styles.card}
  `;

  return (
    <div
      className={`${className} ${extraClass}`}
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
