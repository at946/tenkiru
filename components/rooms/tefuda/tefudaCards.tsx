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
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);
  const deckCards: Card[] | undefined = Decks.find((deck) => deck.key === deckType)?.cards;
  const customDeckCards: Card[] | undefined = useAppSelector((state) => state.room.customDeck);
  const cards: Card[] | undefined = deckType === 'custom' ? customDeckCards : deckCards;

  return (
    <div className='is-flex is-flex-wrap-wrap is-justify-content-center'>
      {!!cards &&
        cards.map((card) => <TefudaCard key={card} card={card} putDownCard={putDownCard} />)}
    </div>
  );
};

export default TefudaCards;
