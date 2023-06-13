import { NextPage } from 'next';
import HandsCard from './HandsCard';
import Decks from '@/data/deck';
import { Card } from '@/interfaces/card';
import { DeckType } from '@/interfaces/deckType';
import { useAppSelector } from '@/store/hooks';
import { Room } from '@/class/room';
import useRoom from '@/hooks/useRoom';

interface Props {
  putDownCard: (card: Card) => void;
}

const HandsCards: NextPage<Props> = ({ putDownCard }) => {
  const room: Room = useRoom();
  const deckType: DeckType = room.getDeckType();
  const deckCards: number | string | undefined = Decks.find((deck) => deck.key === deckType)?.cards;

  return (
    <div className='flex flex-wrap justify-center gap-2' role='group' aria-label='手札'>
      {!!deckCards &&
        deckCards.map((card, index) => (
          <HandsCard key={index} card={card} putDownCard={putDownCard} />
        ))}
    </div>
  );
};

export default HandsCards;
