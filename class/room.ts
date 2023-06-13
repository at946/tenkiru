
export class Room {
  constructor(
    private id: string,
    private table: Table = new Table(),
    private deckType: DeckType = 'fibonacci',
  ) {}

  getId(): string {
    return this.id;
  }

  getTable(): Table {
    return this.table;
  }

  getDeckType(): DeckType {
    return this.deckType;
  }

  setDeckType(newDeckType: DeckType): void {
    this.deckType = newDeckType;
  }
}
