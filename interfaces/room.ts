import { Card } from './card';
import { DeckType } from './deckType';
import { Member } from './member';

export interface Room {
  id: string;
  members: Member[];
  cardsAreOpen: boolean;
  deckType: DeckType;
  customDeck?: Card[];
}
