import { NextPage } from 'next';
import { Card as IFCard } from '@/interfaces/card';
import { MemberType } from '@/interfaces/memberType';
import { useAppSelector } from '@/store/hooks';
import Card from '../card';
import styles from './tefudaCard.module.scss';

interface Props {
  card: IFCard;
  putDownCard: (card: IFCard) => void;
}

const TefudaCard: NextPage<Props> = ({ card, putDownCard }) => {
  const selectedCard: IFCard = useAppSelector((state) => state.user.selectedCard);
  const isSelected: boolean = card === selectedCard;

  const userType: MemberType = useAppSelector((state) => state.user.type);
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);
  const isDisabled: boolean = cardsAreOpen || userType !== 'player';

  const select = () => {
    if (isDisabled || isSelected) return;
    putDownCard(card);
  };

  return (
    <a onClick={select}>
      <Card
        value={card}
        additionalClassName={isSelected ? styles.selected : isDisabled ? styles.disabled : ''}
        ariaLabel={`${isSelected ? 'selected ' : ''}${isDisabled ? 'disabled ' : ''}handsCard`}
      />
    </a>
  );
};

export default TefudaCard;
