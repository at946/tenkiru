import { NextPage } from 'next';
import TefudaCard from './tefudaCard';
import { Card } from '../interfaces/card';
import DeckSelect from './deckSelect';
import TefudaCards from './tefudaCards';

interface Props {
  selectedCard: Card;
  canSelected: boolean;
  putDownCard: (card: Card) => void;
}

const Tefuda: NextPage<Props> = ({ selectedCard, canSelected, putDownCard }) => {
  const selectCard = (card: Card): void => {
    putDownCard(card);
  };

  return (
    <div className="box has-background-warning is-shadowless">
      <DeckSelect />
      <TefudaCards selectedCard={selectedCard} canSelected={canSelected} select={selectCard} />
    </div>
  );
};

export default Tefuda;
