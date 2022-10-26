import { NextPage } from 'next';
import DeckSelect from './deckSelect';
import TefudaCards from './tefudaCards';
import { Card } from '../../../interfaces/card';
import { DeckType } from '../../../interfaces/deckType';

interface Props {
  putDownCard: (card: Card) => void;
  changeDeckType: (newDeckType: DeckType) => void;
  updateCustomDeck: (deck: Card[]) => void;
}

const Tefuda: NextPage<Props> = ({ putDownCard, changeDeckType, updateCustomDeck }) => {
  return (
    <div className='box has-background-warning is-shadowless'>
      <DeckSelect select={changeDeckType} updateCustomDeck={updateCustomDeck} />
      <TefudaCards putDownCard={putDownCard} />
    </div>
  );
};

export default Tefuda;
