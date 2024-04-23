import type { IFDeckType } from './deckType';
import type { IFUser } from './user';

export interface IFRoom {
  id: string;
  deckType: IFDeckType;
  isOpenPhase: boolean;
  users: IFUser[];
}
