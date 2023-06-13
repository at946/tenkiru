import { Card } from './card';
import { Cards } from './cards';

export class Table {
  constructor(private cards: Cards = new Cards(), private isOpenCards: boolean = false) {}

  addCard(card: Card): void {
    this.cards.addCard(card);
  }

  getCards(): Cards {
    return this.cards;
  }

  areNonBlankCardsExist(): boolean {
    this.cards.areNonBlankCardsExist();
  }

  areCardsOpen(): boolean {
    return this.isOpenCards;
  }

  openCard(): void {
    this.isOpenCards = true;
  }
}
