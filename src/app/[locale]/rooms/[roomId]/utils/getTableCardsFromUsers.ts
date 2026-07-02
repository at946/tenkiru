import type { IFTableCard } from '@/interfaces/tableCard';
import type { IFUser } from '@/interfaces/user';

const getTableCardsFromUsers = (users: IFUser[] = []): IFTableCard[] => {
  return [...users]
    .filter((user: IFUser) => user.type === 'player')
    .sort((a, b) => {
      const aSelected: boolean = a.selectedCardValue !== null;
      const bSelected: boolean = b.selectedCardValue !== null;

      if (aSelected && bSelected) {
        return (a.selectedAt ?? 0) - (b.selectedAt ?? 0);
      }

      if (aSelected !== bSelected) {
        return aSelected ? -1 : 1;
      }

      return 0;
    })
    .map((user: IFUser) => ({
      userId: user.id,
      value: user.selectedCardValue,
    }));
};

export default getTableCardsFromUsers;
