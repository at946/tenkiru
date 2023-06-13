
export class Room {
  constructor(
    private id: string,
    private table: Table = new Table(),
    private deckType: DeckType = 'fibonacci',
  ) {}
}