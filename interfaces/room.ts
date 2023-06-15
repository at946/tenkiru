import { DeckType } from './deckType';
import { IFUser } from './user';

export interface IFRoom {
  id: string;
  deckType: DeckType;
  isOpenPhase: boolean;
  users: IFUser[];
}
