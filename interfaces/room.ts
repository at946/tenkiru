import { IFDeckType } from './deckType';
import { IFUser } from './user';

export interface IFRoom {
  id: string;
  deckType: IFDeckType;
  isOpenPhase: boolean;
  users: IFUser[];
}
