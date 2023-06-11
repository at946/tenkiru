import { DeckType } from './deckType';
import { Member } from './member';

export interface Room {
  id: string;
  members: Member[];
  areCardsOpen: boolean;
  deckType: DeckType;
}
