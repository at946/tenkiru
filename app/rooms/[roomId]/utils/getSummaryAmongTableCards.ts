import { IFTableCard } from '@/interfaces/tableCard';
import extractNumberValuesFromTableCards from './extractNumberValuesFromTableCards';

export const getAvgValueAmongTableCards = (tableCards: IFTableCard[]): number | '-' => {
  const numberValues: number[] = extractNumberValuesFromTableCards(tableCards);
  if (numberValues.length > 0) {
    return Math.round((numberValues.reduce((a, b) => a + b) / numberValues.length) * 10) / 10;
  } else {
    return '-';
  }
};

export const getMaxValueAmongTableCards = (tableCards: IFTableCard[]): number | '-' => {
  const numberValues: number[] = extractNumberValuesFromTableCards(tableCards);
  if (numberValues.length > 0) {
    return Math.max(...numberValues);
  } else {
    return '-';
  }
};

export const getMinValueAmongTableCards = (tableCards: IFTableCard[]): number | '-' => {
  const numberValues: number[] = extractNumberValuesFromTableCards(tableCards);
  if (numberValues.length > 0) {
    return Math.min(...numberValues);
  } else {
    return '-';
  }
};
