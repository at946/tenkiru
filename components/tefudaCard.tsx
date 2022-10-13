import { NextPage } from 'next';
import Card from './card';
import styles from './tefudaCard.module.scss';

interface Props {
  value: number | string;
  isSelected: boolean;
  selectCard: (value: number | string) => void;
}

const TefudaCard: NextPage<Props> = ({ value, isSelected, selectCard }) => {
  const selected = () => {
    selectCard(value);
  };

  return (
    <a onClick={selected}>
      <Card
        value={value}
        additionalClassName={isSelected ? styles.selected : ''}
        testId="tefudaCard"
      />
    </a>
  );
};

export default TefudaCard;
