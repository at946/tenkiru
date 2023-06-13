import { Card } from "./card";

export class Table {
  constructor(
    private cards: Card[] = [],
    private areCardsOpen: boolean = false,
  ) {}
}