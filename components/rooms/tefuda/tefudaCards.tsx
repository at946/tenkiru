import { NextPage } from 'next';
import TefudaCard from './tefudaCard';
import Decks from '../../../data/deck';
import { Card } from '../../../interfaces/card';
import { Deck } from '../../../interfaces/deck';
import { DeckType } from '../../../interfaces/deckType';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  putDownCard: (card: Card) => void;
}

const TefudaCards: NextPage<Props> = ({ putDownCard }) => {
  const deckType: DeckType = useAppSelector(state => state.room.deckType)
  const Deck: Deck | undefined = Decks.find((deck) => deck.key === deckType);

  return (
    <div className='is-flex is-flex-wrap-wrap is-justify-content-center'>
      {!!Deck &&
        Deck.cards.map((card) => (
          <TefudaCard
            key={card}
            card={card}
            putDownCard={putDownCard}
          />
        ))}
    </div>
  );
};

export default TefudaCards;
