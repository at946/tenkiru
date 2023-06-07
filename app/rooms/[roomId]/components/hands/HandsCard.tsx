import { NextPage } from 'next';
import { Card as IFCard } from '@/interfaces/card';
import { MemberType } from '@/interfaces/memberType';
import { useAppSelector } from '@/store/hooks';

interface Props {
  card: IFCard;
  putDownCard: (card: IFCard) => void;
}

const HandsCard: NextPage<Props> = ({ card, putDownCard }) => {
  const selectedCard: IFCard = useAppSelector((state) => state.user.selectedCard);
  const isSelected: boolean = card === selectedCard;

  const userType: MemberType = useAppSelector((state) => state.user.type);
  const cardsAreOpen: boolean = useAppSelector((state) => state.room.cardsAreOpen);
  const isDisabled: boolean = cardsAreOpen || userType !== 'player';

  const select = () => {
    if (isDisabled) return;
    putDownCard(isSelected ? null : card);
  };

  return (
    <button
      onClick={select}
      className={`
        flex aspect-card w-24 items-center justify-center rounded-md border border-slate-900 text-2xl font-bold shadow enabled:hover:-translate-y-2 enabled:hover:shadow-2xl enabled:focus:-translate-y-2 enabled:focus:shadow-2xl disabled:cursor-not-allowed
        ${isSelected ? 'bg-rose-500 text-white' : 'bg-white text-slate-900 disabled:opacity-50'}
      `}
      role='option'
      aria-label='手札カード'
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      disabled={isDisabled}
    >
      {card}
    </button>
  );
};

export default HandsCard;
