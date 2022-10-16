export type Card = string | number | null;

export interface Decks {
  [id: string]: Deck;
}

export type Deck = Card[];

export type DeckType = 'fibonacci' | 'sequential';
