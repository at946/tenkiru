import { User } from './user';
import { IFDeckType } from '@/interfaces/deckType';
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

  setDeckType(newDeckType: IFDeckType): void {
    this.deckType = newDeckType;
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
