import { Member } from './member';
import { MemberType } from './memberType';
import { DeckType } from './deckType';
import { Card } from './card';

export interface ServerToClientEvents {
  'update-members': (members: Member[]) => void;
  'update-deck-type': (deckType: DeckType) => void;
  'update-custom-deck': (deck: Card[]) => void;
  'update-cards-are-open': (cardsAreOpen: boolean) => void;
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void;
  'change-deck-type': (roomId: string, newDeckType: DeckType) => void;
  'put-down-a-card': (roomId: string, card: Card) => void;
  'open-cards': (roomId: string) => void;
  replay: (roomId: string) => void;
  'change-member-type': (roomId: string, memberType: MemberType) => void;
  'update-custom-deck': (roomId: string, deck: Card[]) => void;
}
