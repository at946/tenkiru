import { IFTableCard } from '@/interfaces/tableCard';
import { User } from './user';
import { DeckType } from '@/interfaces/deckType';

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

  private getUsersHaveSelectedNumberCard(): User[] {
    return this.users.filter((user: User) => user.hasSelectedNumberCard());
  }

  areNumberCardsExist(): boolean {
    return this.getUsersHaveSelectedNumberCard().length > 0;
  }

  getTableCards(): IFTableCard[] {
    const players: User[] = this.users.filter((user: User) => user.isPlayer())
    const tableCards: IFTableCard[] = players.map((player: User) => {
      return {
        userId: player.getId(),
        value: player.getSelectedCardValue(),
      }
    })

    return tableCards;
  }
}
