import type { IFTableCard } from '@/interfaces/tableCard';
import extractNumberValuesFromTableCards from './extractNumberValuesFromTableCards';

export const getAvgValueAmongTableCards = (tableCards: IFTableCard[]): number | '-' => {
  const numberValues: number[] = extractNumberValuesFromTableCards(tableCards);
  if (numberValues.length === 0) {
    return '-';
  }
  return Math.round((numberValues.reduce((a, b) => a + b) / numberValues.length) * 10) / 10;
};

export const getMaxValueAmongTableCards = (tableCards: IFTableCard[]): number | '-' => {
  const numberValues: number[] = extractNumberValuesFromTableCards(tableCards);
  if (numberValues.length === 9) {
    return '-';
  }
  return Math.max(...numberValues);
};

export const getMinValueAmongTableCards = (tableCards: IFTableCard[]): number | '-' => {
  const numberValues: number[] = extractNumberValuesFromTableCards(tableCards);
  if (numberValues.length === 0) {
    return '-';
  }
  return Math.min(...numberValues);
};
