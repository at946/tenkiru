import { Member } from './member';
import { MemberType } from './memberType';
import { DeckType } from './deckType';
import { Card } from './card';

export interface ServerToClientEvents {
  'update-members': (members: Member[]) => void;
  'update-deck-type': (deckType: DeckType) => void;
  'update-are-cards-open': (areCardsOpen: boolean) => void;
  nominate: () => void;
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void;
  'change-deck-type': (roomId: string, newDeckType: DeckType) => void;
  'update-selected-card': (roomId: string, card: Card) => void;
  'open-cards': (roomId: string) => void;
  replay: (roomId: string) => void;
  'change-member-type': (roomId: string, memberType: MemberType) => void;
  nominate: (memberId: string) => void;
}
