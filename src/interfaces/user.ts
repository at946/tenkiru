import type { IFTableCardValue } from './tableCardValue';
import type { IFUserType } from './userType';

export interface IFUser {
  id: string;
  type: IFUserType;
  selectedCardValue: IFTableCardValue;
}
