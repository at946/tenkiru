import type { IFDeckType } from './deckType';
import type { IFRoom } from './room';
import type { IFTableCardValue } from './tableCardValue';
import type { IFUserType } from './userType';

export interface IFServerToClientEvents {
  'update-room': (room: IFRoom) => void;
  'receive-request-to-select': () => void;
  nominate: () => void;
}

export interface IFClientToServerEvents {
  'join-room': (roomId: string) => void;
  'change-deck-type': (roomId: string, newDeckType: IFDeckType) => void;
  'select-card': (roomId: string, cardValue: IFTableCardValue) => void;
  'open-cards': (roomId: string) => void;
  'request-to-select': (roomId: string) => void;
  replay: (roomId: string) => void;
  'change-user-type': (roomId: string, userType: IFUserType) => void;
  nominate: (memberId: string) => void;
}
