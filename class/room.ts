import { User } from './user';
import Decks from '@/data/deck';
import { IFTableCard } from '@/interfaces/tableCard';
import { IFDeckType } from '@/interfaces/deckType';
import { IFDeck } from '@/interfaces/deck';
import { IFTableCardValue } from '@/interfaces/tableCardValue';
import { IFRoom } from '@/interfaces/room';

export class Room {
  constructor(
    private id: string = '',
    private deckType: IFDeckType = 'fibonacci',
    private isOpenPhase: boolean = false,
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

  hasUsers(): boolean {
    return this.users.length > 0;
  }

  removeUser(userId: string): void {
    this.users = this.users.filter((user: User) => user.getId() !== userId);
  }

  rePushUser(userId: string): void {
    const targetUser: User | undefined = this.findUserById(userId);
    if (!targetUser) return;
    this.removeUser(userId);
    this.users.push(targetUser);
  }

  reUnshiftUser(userId: string): void {
    const targetUser: User | undefined = this.findUserById(userId);
    if (!targetUser) return;
    this.removeUser(userId);
    this.users.unshift(targetUser);
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
