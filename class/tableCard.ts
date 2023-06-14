// interfaces
import { IFTableCardValue } from '@/interfaces/tableCardValue';

export class TableCard {
  constructor(private playerId: string, private value: IFTableCardValue = null) {}

  getPlayerId(): string {
    return this.playerId;
  }

  getValue(): IFTableCardValue {
    return this.value;
  }

  setValue(newValue: IFTableCardValue): void {
    this.value = newValue;
  }

  isBlank(): boolean {
    return this.value === null;
  }

  isNumberValue(): boolean {
    return typeof this.value === 'number';
  }
}
