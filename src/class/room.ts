import Decks from '@/data/deck';
import type { IFDeck } from '@/interfaces/deck';
import type { IFDeckType } from '@/interfaces/deckType';
import type { IFRoom } from '@/interfaces/room';
import type { IFTableCard } from '@/interfaces/tableCard';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import type { User } from './user';

export class Room {
  constructor(
    private id = '',
    private deckType: IFDeckType = 'fibonacci',
    private isOpenPhase = false,
    private users: User[] = [],
  ) {}

  toObject(): IFRoom {
    return {
      id: this.id,
      deckType: this.deckType,
      isOpenPhase: this.isOpenPhase,
      users: this.users.map((user: User) => user.toObject()),
    };
  }

  getId(): string {
    return this.id;
  }

  getDeckType(): IFDeckType {
    return this.deckType;
  }

  getDeck(): IFDeck | undefined {
    return Decks.find((deck: IFDeck) => deck.key === this.deckType);
  }

  setDeckType(newDeckType: IFDeckType): void {
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

  getPlayers(): User[] {
    return this.users.filter((user: User) => user.isPlayer());
  }

  getPlayersNotSelectCard(): User[] {
    const players: User[] = this.getPlayers();
    return players.filter((player: User) => !player.hasSelectedCard());
  }

  hasUsers(): boolean {
    return this.users.length > 0;
  }

  removeUser(userId: string): void {
    this.users = this.users.filter((user: User) => user.getId() !== userId);
  }

  reorderUser(userId: string): void {
    const targetUser: User | undefined = this.findUserById(userId);
    if (!targetUser) return;

    this.removeUser(targetUser.getId());

    if (targetUser.hasSelectedCard()) {
      this.users.unshift(targetUser);
    } else {
      this.users.push(targetUser);
    }
  }

  private getUsersHaveSelectedNumberCard(): User[] {
    return this.users.filter((user: User) => user.hasSelectedNumberCard());
  }

  areNumberCardsExist(): boolean {
    return this.getUsersHaveSelectedNumberCard().length > 0;
  }

  private getNumberCardsValues(): number[] {
    const usersHaveSelectedNumberCard: User[] = this.getUsersHaveSelectedNumberCard();
    const numberCardsValues: IFTableCardValue[] = usersHaveSelectedNumberCard.map((user: User) =>
      user.getSelectedCardValue(),
    );
    return numberCardsValues as number[];
  }

  getMaxInTableCards(): number | undefined {
    if (!this.areNumberCardsExist()) return;
    return Math.max(...this.getNumberCardsValues());
  }

  getMinInTableCards(): number | undefined {
    if (!this.areNumberCardsExist()) return;
    return Math.min(...this.getNumberCardsValues());
  }

  getAverageOfTableCards(): number | undefined {
    if (!this.areNumberCardsExist()) return;
    const numberCardsValues: number[] = this.getNumberCardsValues();
    return Math.round((numberCardsValues.reduce((a, b) => a + b) / numberCardsValues.length) * 10) / 10;
  }

  getTableCards(): IFTableCard[] {
    const players: User[] = this.users.filter((user: User) => user.isPlayer());
    return players.map((player: User) => player.getCard());
  }

  openCards(): void {
    this.isOpenPhase = true;
  }

  resetCards(): void {
    for (const user of this.users) {
      user.resetCard();
    }
  }

  replay(): void {
    this.isOpenPhase = false;
    this.resetCards();
  }
}
