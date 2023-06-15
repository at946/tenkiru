import { IFMemberType } from '@/interfaces/userType';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

export class Member {
  constructor(
    private id: string,
    private type: IFMemberType = 'player',
    private selectedCardValue: IFTableCardValue = null,
  ) {}

  getSelectedCardValue(): IFTableCardValue {
    return this.selectedCardValue;
  }
}
