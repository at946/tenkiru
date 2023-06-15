import { IFTableCard } from '@/interfaces/tableCard';
import { User } from './user';
import { DeckType } from '@/interfaces/deckType';
import Decks from '@/data/deck';
import { IFDeck } from '@/interfaces/deck';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

export class Room {
  constructor(
    private id: string,
    private deckType: DeckType = 'fibonacci',
    private isOpenPhase: boolean = false,
    private users: User[] = [],
  ) {}

  getId(): string {
    return this.id;
  }

  getDeckType(): DeckType {
    return this.deckType;
  }

  getDeck(): IFDeck | undefined {
    return Decks.find((deck: IFDeck) => deck.key === this.deckType);
  }

  setDeckType(newDeckType: DeckType): void {
    this.deckType = newDeckType;
  }

  areCardsOpen(): boolean {
    return this.isOpenPhase;
  }

  addUser(newUser: User): void {
    this.users.push(newUser);
  }

  findUserById(userId: string): User | undefined {
    return this.users.find((user: User) => user.getId() === userId);
  }

  hasUsers(): boolean {
    return this.users.length > 0;
  }

  removeUser(userId: string): void {
    this.users = this.users.filter((user: User) => user.getId() !== userId);
  }

  rePushUser(userId: string): void {
    const targetUser: User = this.findUserById(userId);
    this.removeUser(userId);
    this.users.push(targetUser);
  }

  reUnshiftUser(userId: string): void {
    const targetUser: User = this.findUserById(userId);
    this.removeUser(userId);
    this.users.unshift(targetUser);
  }

  private getUsersHaveSelectedNumberCard(): User[] {
    return this.users.filter((user: User) => user.hasSelectedNumberCard());
  }

  areNumberCardsExist(): boolean {
    return this.getUsersHaveSelectedNumberCard().length > 0;
  }

  private getNumberCardsValues(): IFTableCardValue[] {
    const usersHaveSelectedNumberCard: User[] = this.getUsersHaveSelectedNumberCard();
    const numberCardsValues: IFTableCardValue[] = usersHaveSelectedNumberCard.map((user: User) =>
      user.getSelectedCardValue(),
    );
    return numberCardsValues;
  }

  getMaxInTableCards(): number | null {
    if (!this.areNumberCardsExist()) return;
    return Math.max(...this.getNumberCardsValues());
  }

  getMinInTableCards(): number | null {
    if (!this.areNumberCardsExist()) return;
    return Math.min(...this.getNumberCardsValues());
  }

  getAverageOfTableCards(): number | null {
    if (!this.areNumberCardsExist()) return;
    const numberCardsValues: number[] = this.getNumberCardsValues();
    return (
      Math.round((numberCardsValues.reduce((a, b) => a + b) / numberCardsValues.length) * 10) / 10
    );
  }

  getTableCards(): IFTableCard[] {
    const players: User[] = this.users.filter((user: User) => user.isPlayer());
    return players.map((player: User) => player.getCard());
  }

  openCards(): void {
    this.isOpenPhase = true;
  }

  resetCards(): void {
    this.users.forEach((user: User) => {
      user.resetCard();
    });
  }

  replay(): void {
    this.isOpenPhase = false;
    this.resetCards();
  }
}
