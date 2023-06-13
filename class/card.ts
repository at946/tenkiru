export class Card {
  constructor(private playerId: string, private value: number | string | null = null) {}

  getValue(): number | string | null {
    return this.value;
  }

  getPlayerId(): string {
    return this.playerId;
  }

  isBlank(): boolean {
    return this.value === null;
  }

  isNumberCard(): boolean {
    return typeof this.value === 'number';
  }
}
