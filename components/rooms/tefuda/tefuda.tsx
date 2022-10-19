import { NextPage } from 'next';
import DeckSelect from './deckSelect';
import TefudaCards from './tefudaCards';
import { Card } from '../../../interfaces/card';
import { DeckType } from '../../../interfaces/deckType';

interface Props {
  putDownCard: (card: Card) => void;
  changeDeckType: (newDeckType: DeckType) => void;
}

const Tefuda: NextPage<Props> = ({
  putDownCard,
  changeDeckType,
}) => {
  const selectCard = (card: Card): void => {
    putDownCard(card);
  };

  return (
    <div className='box has-background-warning is-shadowless'>
      <DeckSelect select={changeDeckType} />
      <TefudaCards select={selectCard} />
    </div>
  );
};

export default Tefuda;
