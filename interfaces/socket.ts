import { IFUserType } from './userType';
import { DeckType } from './deckType';
import { IFRoom } from './room';
import { IFHandsCardValue } from './handsCardValue';

export interface IFServerToClientEvents {
  'update-room': (room: IFRoom) => void;
  nominate: () => void;
}

export interface IFClientToServerEvents {
  'join-room': (roomId: string) => void;
  'change-deck-type': (roomId: string, newDeckType: DeckType) => void;
  'select-card': (roomId: string, cardValue: IFHandsCardValue) => void;
  'open-cards': (roomId: string) => void;
  replay: (roomId: string) => void;
  'change-user-type': (roomId: string, userType: IFUserType) => void;
  nominate: (memberId: string) => void;
}
