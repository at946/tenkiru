import { NextPage } from 'next';
import TefudaCard from './tefudaCard';
import Decks from '../../../../../data/deck';
import { Card } from '../../../../../interfaces/card';
import { DeckType } from '../../../../../interfaces/deckType';
import { useAppSelector } from '../../../../../store/hooks';

interface Props {
  putDownCard: (card: Card) => void;
}

const TefudaCards: NextPage<Props> = ({ putDownCard }) => {
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);
  const deckCards: Card[] | undefined = Decks.find((deck) => deck.key === deckType)?.cards;
  const cards: Card[] | undefined = deckCards;

  return (
    <div className='is-flex is-flex-wrap-wrap is-justify-content-center'>
      {!!cards &&
        cards.map((card, index) => (
          <TefudaCard key={index} card={card} putDownCard={putDownCard} />
        ))}
    </div>
  );
};

export default TefudaCards;
