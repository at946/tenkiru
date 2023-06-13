export class Card {
  constructor(
    private playerId: string,
    private value: number | string | null = null
  ) {}
}