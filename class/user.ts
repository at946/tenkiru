import { IFUserType } from '@/interfaces/userType';

export class User {
  constructor(
    private id: string,
    private type: IFUserType = 'player',
    private hasSelectedCard: boolean = false,
    private selectedCardValue?: number | string,
  ) {}

  getId(): string {
    return this.id;
  }

  isPlayer(): boolean {
    return this.type === 'player';
  }

  hasSelectedNumberCard(): boolean {
    return this.hasSelectedCard && typeof this.selectedCardValue === 'number';
  }

  getSelectedCardValue(): number | string {
    return this.selectedCardValue;
  }
}
