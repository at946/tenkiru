import { IFTableCardValue } from '@/interfaces/tableCardValue';
import { IFUser } from '@/interfaces/user';
import { IFUserType } from '@/interfaces/userType';

export class User {
  constructor(
    private id: string = '',
    private type: IFUserType = 'player',
    private selectedCardValue: IFTableCardValue = null,
  ) {}

  toObject(): IFUser {
    return {
      id: this.id,
      type: this.type,
      selectedCardValue: this.selectedCardValue,
    };
  }

  getId(): string {
    return this.id;
  }

  isPlayer(): boolean {
    return this.type === 'player';
  }

  setType(newType: IFUserType): void {
    this.type = newType;
  }

  hasSelectedCard(): boolean {
    return this.isPlayer() && this.selectedCardValue !== null;
  }

  selectCard(cardValue: IFTableCardValue): void {
    this.selectedCardValue = cardValue;
  }

  resetCard(): void {
    this.selectedCardValue = null;
  }
}
