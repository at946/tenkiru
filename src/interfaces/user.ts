import { IFTableCardValue } from './tableCardValue';
import { IFUserType } from './userType';

export interface IFUser {
  id: string;
  type: IFUserType;
  selectedCardValue: IFTableCardValue;
}
