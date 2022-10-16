import { NextPage } from 'next';
import DeckSelect from './deckSelect';
import TefudaCards from './tefudaCards';
import { Card } from '../../../interfaces/card';
import { DeckType } from '../../../interfaces/deckType';

interface Props {
  deckType: DeckType;
  selectedCard: Card;
  canSelected: boolean;
  putDownCard: (card: Card) => void;
  changeDeckType: (newDeckType: DeckType) => void;
}

const Tefuda: NextPage<Props> = ({
  deckType,
  selectedCard,
  canSelected,
  putDownCard,
  changeDeckType,
}) => {
  const selectCard = (card: Card): void => {
    putDownCard(card);
  };

  return (
    <div className='box has-background-warning is-shadowless'>
      <DeckSelect deckType={deckType} select={changeDeckType} />
      <TefudaCards
        deckType={deckType}
        selectedCard={selectedCard}
        canSelected={canSelected}
        select={selectCard}
      />
    </div>
  );
};

export default Tefuda;
