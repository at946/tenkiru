import { NextPage } from 'next';
import TefudaCard from './tefudaCard';
import { Card } from '../interfaces/card'

interface Props {
  selectedCard: Card;
  canSelected: Boolean;
  putDownCard: (number: number | string) => void;
}

const Tefuda: NextPage<Props> = ({ selectedCard, canSelected, putDownCard }) => {
  const selectCard = (number: number | string): void => {
    putDownCard(number);
  };

  return (
    <div className='is-flex is-flex-wrap-wrap is-justify-content-center has-background-light box is-shadowless'>
      {[1, 2, 3, 5, 8, 13, 21, '?'].map((number) => (
        <TefudaCard
          key={number}
          value={number}
          isSelected={number === selectedCard}
          isDisabled={!canSelected}
          selectCard={selectCard}
        />
      ))}
    </div>
  );
};

export default Tefuda;
