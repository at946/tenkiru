import type { IFTableCard } from '@/interfaces/tableCard';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';

const extractNumberValuesFromTableCards = (tableCards: IFTableCard[]): number[] => {
  const values: IFTableCardValue[] = tableCards.map((tableCard: IFTableCard) => tableCard.value);
  const numberValues: number[] = values.filter((value: IFTableCardValue) => typeof value === 'number') as number[];
  return numberValues;
};

export default extractNumberValuesFromTableCards;
