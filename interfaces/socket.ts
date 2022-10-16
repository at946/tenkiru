import { Member } from './member';
import { MemberType } from './memberType';
import { Card } from './card';
import { DeckType } from './deckType';

export interface ServerToClientEvents {
  'update-members': (members: Member[]) => void;
  'update-deck-type': (deckType: DeckType) => void;
  'update-cards-are-open': (cardsAreOpen: boolean) => void;
  replay: (members: Member[]) => void;
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void;
  'change-deck-type': (roomId: string, newDeckType: DeckType) => void;
  'put-down-a-card': (roomId: string, card: Card) => void;
  'open-cards': (roomId: string) => void;
  'clear-cards': (roomId: string) => void;
  'change-member-type': (roomId: string, memberType: MemberType) => void;
}
