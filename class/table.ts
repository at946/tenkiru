// class
import { TableCard } from './tableCard';

// interfaces
import { IFTableCardValue } from '@/interfaces/tableCardValue';

export class Table {
  constructor(private cards: TableCard[] = [], private cardsAreOpen: boolean = false) {}

  addCard(card: TableCard): void {
    this.cards.push(card);
  }

  getCards(): TableCard[] {
    return this.cards;
  }

  findCardByPlayerId(playerId: string): TableCard | undefined {
    return this.cards.find((card: TableCard) => card.getPlayerId() === playerId);
  }

  removeCardByPlayerId(playerId: string): void {
    this.cards = this.cards.filter((card: TableCard) => card.getPlayerId() !== playerId);
  }

  reorderCards(): void {
    const blankCards: TableCard[] = [];
    const nonBlankCards: TableCard[] = [];

    this.cards.forEach((card: TableCard) => {
      if (card.isBlank()) {
        blankCards.push(card);
      } else {
        nonBlankCards.push(card);
      }
    });

    this.cards = [...nonBlankCards, ...blankCards];
  }

  openCard(): void {
    this.cardsAreOpen = true;
  }

  clearCards(): void {
    this.cards.forEach((card) => card.setValue(null));
  }

  areCardsExist(): boolean {
    return this.cards.length > 0;
  }

  areNonBlankCardsExist(): boolean {
    return !!this.cards.filter((card: TableCard) => !card.isBlank());
  }

  private getNumberCards(): TableCard[] {
    return this.cards.filter((card: TableCard) => card.isNumberValue());
  }

  areNumberCardsExist(): boolean {
    return !!this.getNumberCards();
  }

  areCardsOpen(): boolean {
    return this.cardsAreOpen;
  }

  private getNumberCardsValues(): IFTableCardValue[] {
    return this.getNumberCards().map((card: TableCard) => card.getValue());
  }

  getMaxInTableCards(): number {
    return Math.max(...this.getNumberCardsValues());
  }

  getMinInTableCards(): number {
    return Math.min(...this.getNumberCardsValues());
  }

  getAverageOfTableCards(): number {
    const numberCardsValues: number[] = this.getNumberCardsValues();
    return numberCardsValues.reduce((a, b) => a + b) / numberCardsValues.length;
  }
}
