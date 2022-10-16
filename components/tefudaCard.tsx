import { NextPage } from 'next';
import { Card as IFCard } from '../interfaces/card';
import Card from './card';
import styles from './tefudaCard.module.scss';

interface Props {
  card: IFCard;
  isSelected: boolean;
  isDisabled: boolean;
  selectCard: (card: IFCard) => void;
}

const TefudaCard: NextPage<Props> = ({ card, isSelected, isDisabled, selectCard }) => {
  const selected = () => {
    if (isDisabled) return;
    selectCard(card);
  };

  const className = isSelected ? styles.selected : '';

  return (
    <a onClick={selected}>
      <Card value={card} additionalClassName={className} testId='tefudaCard' />
    </a>
  );
};

export default TefudaCard;
