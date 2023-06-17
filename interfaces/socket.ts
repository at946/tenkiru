import { IFUserType } from './userType';
import { IFDeckType } from './deckType';
import { IFRoom } from './room';
import { IFTableCardValue } from './tableCardValue';

export interface IFServerToClientEvents {
  'update-room': (room: IFRoom) => void;
  nominate: () => void;
}

export interface IFClientToServerEvents {
  'join-room': (roomId: string) => void;
  'change-deck-type': (roomId: string, newDeckType: IFDeckType) => void;
  'select-card': (roomId: string, cardValue: IFTableCardValue) => void;
  'open-cards': (roomId: string) => void;
  replay: (roomId: string) => void;
  'change-user-type': (roomId: string, userType: IFUserType) => void;
  nominate: (memberId: string) => void;
}
