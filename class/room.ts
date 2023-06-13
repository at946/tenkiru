import { Table } from "./table";
import { DeckType } from "@/interfaces/deckType";

export class Room {
  constructor(
    private id: string,
    private table: Table = new Table(),
    private deckType: DeckType = 'fibonacci',
  ) {}
}