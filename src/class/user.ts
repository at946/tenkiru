import type { IFTableCard } from '@/interfaces/tableCard';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import type { IFUser } from '@/interfaces/user';
import type { IFUserType } from '@/interfaces/userType';

export class User {
  constructor(
    private id = '',
    private type: IFUserType = 'player',
    private selectedCardValue: IFTableCardValue = null,
    private selectedAt: number | null = null,
  ) {}

  toObject(): IFUser {
    return {
      id: this.id,
      type: this.type,
      selectedCardValue: this.selectedCardValue,
      selectedAt: this.selectedAt,
    };
  }

  getId(): string {
    return this.id;
  }

  isPlayer(): boolean {
    return this.type === 'player';
  }

  getType(): IFUserType {
    return this.type;
  }

  setType(newType: IFUserType): void {
    this.type = newType;
  }

  hasSelectedCard(): boolean {
    return this.isPlayer() && this.selectedCardValue !== null;
  }

  hasSelectedNumberCard(): boolean {
    return this.isPlayer() && typeof this.selectedCardValue === 'number';
  }

  getSelectedCardValue(): IFTableCardValue {
    return this.selectedCardValue;
  }

  getSelectedAt(): number | null {
    return this.selectedAt;
  }

  getCard(): IFTableCard {
    return {
      userId: this.id,
      value: this.selectedCardValue,
    };
  }

  selectCard(cardValue: IFTableCardValue): void {
    this.selectedCardValue = cardValue;
    this.selectedAt = cardValue === null ? null : Date.now();
  }

  resetCard(): void {
    this.selectedCardValue = null;
  }
}
