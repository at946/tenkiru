import { NextPage } from 'next';
import { Card } from '@/interfaces/card';
import styles from './card.module.scss';

interface Props {
  value: Card;
  additionalClassName?: string;
  testId?: string;
  ariaLabel?: string;
}

const Card: NextPage<Props> = ({ value, additionalClassName, testId, ariaLabel }) => {
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
      className={`${className} ${additionalClassName || ''}`}
      data-testid={testId}
      aria-label={ariaLabel}
    >
      {value}
    </div>
  );
};

export default Card;
