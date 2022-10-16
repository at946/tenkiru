import { Card } from './card';

export interface Deck {
  key: string
  displayName: string
  cards: Card[]
};