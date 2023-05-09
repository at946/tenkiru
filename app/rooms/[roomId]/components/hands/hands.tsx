import { NextPage } from 'next';
import DeckSelect from './deckSelect';
import HandsCards from './handsCards';
import { Card } from '@/interfaces/card';
import { DeckType } from '@/interfaces/deckType';

interface Props {
  putDownCard: (card: Card) => void;
  changeDeckType: (newDeckType: DeckType) => void;
}

const Hands: NextPage<Props> = ({ putDownCard, changeDeckType }) => {
  return (
    <div className='box has-background-light is-shadowless'>
      <DeckSelect select={changeDeckType} />
      <HandsCards putDownCard={putDownCard} />
    </div>
  );
};

export default Hands;
