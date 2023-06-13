
export class Room {
  constructor(
    private id: string,
    private table: Table = new Table(),
    private deckType: DeckType = 'fibonacci',
  ) {}

  isById(id: string): boolean {
    return this.id === id;
  }

  getTable(): Table {
    return this.table;
  }

  getDeckType(): DeckType {
    return this.deckType;
  }
}
