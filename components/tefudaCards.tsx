import { NextPage } from 'next';
import Decks from '../data/deck';
import { Card } from '../interfaces/card';
import { Deck } from '../interfaces/deck';
import { DeckType } from '../interfaces/deckType';
import TefudaCard from './tefudaCard';

interface Props {
  deckType: DeckType;
  selectedCard: Card;
  canSelected: boolean;
  select: (card: Card) => void;
}

const TefudaCards: NextPage<Props> = ({ deckType, selectedCard, canSelected, select }) => {
  const Deck: Deck | undefined = Decks.find(deck => deck.key === deckType);

  return (
    <div className='is-flex is-flex-wrap-wrap is-justify-content-center'>
      {!!Deck && Deck.cards.map((card) => (
        <TefudaCard
          key={card}
          card={card}
          isSelected={card === selectedCard}
          isDisabled={!canSelected}
          selectCard={select}
        />
      ))}
    </div>
  );
};

export default TefudaCards;
