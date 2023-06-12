import { NextPage } from 'next';
import HandsCard from './HandsCard';
import Decks from '@/data/deck';
import { Card } from '@/interfaces/card';
import { DeckType } from '@/interfaces/deckType';
import { useAppSelector } from '@/store/hooks';

interface Props {
  deckType: DeckType;
  selectedCard?: Card;
  disabled?: boolean;
  updateSelectedCard: (card: Card) => void;
}

const HandsCards: NextPage<Props> = ({ deckType, selectedCard, disabled, updateSelectedCard }) => {
  const deckCards: Card[] = Decks.find((deck) => deck.key === deckType)?.cards;

  const handleOnSelect = (newSelectedCard: Card) => {
    updateSelectedCard(newSelectedCard !== selectedCard ? newSelectedCard : null);
  };

  return (
    <div className='flex flex-wrap justify-center gap-4' role='group' aria-label='手札'>
      {deckCards.map((value) => (
        <HandsCard
          key={value}
          value={value}
          disabled={disabled}
          selected={value === selectedCard}
          onSelect={handleOnSelect}
        />
      ))}
    </div>
  );
};

export default HandsCards;
