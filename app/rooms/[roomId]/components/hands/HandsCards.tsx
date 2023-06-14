import { NextPage } from 'next';
import { Room } from '@/class/room';
import { User } from '@/class/user';
import Decks from '@/data/deck';
import { DeckType } from '@/interfaces/deckType';
import { IFHandsCardValue } from '@/interfaces/handsCardValue';
import useRoom from '@/hooks/useRoom';
import useUser from '@/hooks/useUser';
import HandsCard from './HandsCard';

interface Props {
  select: (value: IFHandsCardValue) => void;
}

const HandsCards: NextPage<Props> = ({ select }) => {
  const room: Room = useRoom();
  const deckType: DeckType = room.getDeckType();
  const deckCards: IFHandsCardValue = Decks.find((deck) => deck.key === deckType)?.cards;
  const user: User = useUser();

  return (
    <div className='flex flex-wrap justify-center gap-2' role='group' aria-label='手札'>
      {!!deckCards &&
        deckCards.map((value: IFHandsCardValue) => (
          <HandsCard
            key={value}
            value={value}
            isSelected={value === user.getSelectedCardValue()}
            putDownCard={select}
          />
        ))}
    </div>
  );
};

export default HandsCards;
