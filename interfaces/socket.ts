import { Member, MemberType } from './member';
import { Card } from './card';

export interface ServerToClientEvents {
  'update-members': (members: Member[]) => void;
  'update-cards-are-open': (cardsAreOpen: boolean) => void;
  replay: (members: Member[]) => void;
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void;
  'put-down-a-card': (roomId: string, card: Card) => void;
  'open-cards': (roomId: string) => void;
  'clear-cards': (roomId: string) => void;
  'change-member-type': (roomId: string, memberType: MemberType) => void;
}
