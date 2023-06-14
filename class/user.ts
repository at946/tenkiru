import { MemberType } from '@/interfaces/memberType';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

export class User {
  constructor(
    private id: string,
    private type: MemberType = 'player',
    private selectedCardValue: IFTableCardValue = null,
  ) {}

  getId(): string {
    return this.id;
  }

  getMemberType(): MemberType {
    return this.type;
  }

  getSelectedCardValue(): IFTableCardValue {
    return this.selectedCardValue;
  }

  setSelectedCardValue(newValue: IFTableCardValue): void {
    this.selectedCardValue = newValue;
  }
}
