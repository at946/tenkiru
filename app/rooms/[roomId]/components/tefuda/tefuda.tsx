import { NextPage } from 'next';
import DeckSelect from './deckSelect';
import TefudaCards from './tefudaCards';
import { Card } from '@/interfaces/card';
import { DeckType } from '@/interfaces/deckType';

interface Props {
  putDownCard: (card: Card) => void;
  changeDeckType: (newDeckType: DeckType) => void;
}

const Tefuda: NextPage<Props> = ({ putDownCard, changeDeckType }) => {
  return (
    <div className='box has-background-warning is-shadowless'>
      <DeckSelect select={changeDeckType} />
      <TefudaCards putDownCard={putDownCard} />
    </div>
  );
};

export default Tefuda;
