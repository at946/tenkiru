import { Card } from './card';

export class Table {
  constructor(private cards: Card[] = [], private isOpenCards: boolean = false) {}

  addCard(card: Card): void {
    this.cards.push(card);
  }

  getCards(): Card[] {
    return this.cards;
  }

  areCardsOpen(): boolean {
    return this.isOpenCards;
  }
}
