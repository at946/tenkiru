import { IFTableCard } from '@/interfaces/tableCard';
import { IFUser } from '@/interfaces/user';

const getTableCardsFromUsers = (users: IFUser[] = []): IFTableCard[] => {
  const players: IFUser[] = users.filter((user: IFUser) => user.type === 'player');
  return players.map((user: IFUser) => {
    const tableCard: IFTableCard = {
      userId: user.id,
      value: user.selectedCardValue,
    };
    return tableCard;
  });
};

export default getTableCardsFromUsers;