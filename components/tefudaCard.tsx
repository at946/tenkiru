import { NextPage } from 'next';
import Card from './card';
import styles from './tefudaCard.module.scss';

interface Props {
  value: number | string;
  isSelected: boolean;
  isDisabled: boolean;
  selectCard: (value: number | string) => void;
}

const TefudaCard: NextPage<Props> = ({ value, isSelected, isDisabled, selectCard }) => {
  const selected = () => {
    if (isDisabled) return;
    selectCard(value);
  };

  const className = isSelected ? styles.selected : isDisabled ? styles.disabled : '';

  return (
    <a onClick={selected}>
      <Card value={value} additionalClassName={className} testId='tefudaCard' />
    </a>
  );
};

export default TefudaCard;
