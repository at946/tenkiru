import type { IFHandsCardValue } from './handsCardValue';

export interface IFDeck {
  key: string;
  displayName: string;
  cardValues: IFHandsCardValue[];
}
