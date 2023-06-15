import { Member } from './member';
import { MemberType } from './userType';
import { DeckType } from './deckType';
import { Card } from './card';
import { User } from '@/class/user';
import { IFRoom } from './room';

export interface ServerToClientEvents {
  'update-room': (room: IFRoom) => void;
  'update-user': (user: User) => void;
  'update-members': (members: Member[]) => void;
  'update-deck-type': (deckType: DeckType) => void;
  'update-cards-are-open': (cardsAreOpen: boolean) => void;
  nominate: () => void;
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void;
  'change-deck-type': (roomId: string, newDeckType: DeckType) => void;
  'put-down-a-card': (roomId: string, card: Card) => void;
  'open-cards': (roomId: string) => void;
  replay: (roomId: string) => void;
  'change-member-type': (roomId: string, memberType: MemberType) => void;
  nominate: (memberId: string) => void;
}
