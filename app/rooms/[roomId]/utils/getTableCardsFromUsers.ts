import { IFTableCard } from '@/interfaces/tableCard';
import { IFUser } from '@/interfaces/user';

const getTableCardsFromUsers = (users: IFUser[] = []): IFTableCard[] => {
  return users.map((user: IFUser) => {
    const tableCard: IFTableCard = {
      userId: user.id,
      value: user.selectedCardValue,
    };
    return tableCard;
  });
};

export default getTableCardsFromUsers;
