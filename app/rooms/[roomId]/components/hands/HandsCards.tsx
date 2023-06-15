import { NextPage } from 'next';
import { Room } from '@/class/room';
import { User } from '@/class/user';
import { IFHandsCardValue } from '@/interfaces/handsCardValue';
import useRoom from '@/hooks/useRoom';
import HandsCard from './HandsCard';
import { IFDeck } from '@/interfaces/deck';

interface Props {
  user: User;
  select: () => void;
}

const HandsCards: NextPage<Props> = ({ user, select }) => {
  const room: Room = useRoom();
  const deck: IFDeck | undefined = room.getDeck();

  return (
    <div className='flex flex-wrap justify-center gap-2' role='group' aria-label='手札'>
      {!!deck &&
        deck.cardValues.map((value: IFHandsCardValue) => (
          <HandsCard
            key={value}
            value={value}
            isSelected={value === user?.getSelectedCardValue()}
            isDisabled={room.areCardsOpen() || !user?.isPlayer()}
            onClick={select}
          />
        ))}
    </div>
  );
};

export default HandsCards;
