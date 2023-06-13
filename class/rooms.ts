import { Room } from './room';

export class Rooms {
  constructor(private rooms: Room[] = []) {}

  addRoom(room: Room): void {
    this.rooms.push(room);
  }

  findRoom(roomId: string): Room | undefined {
    return this.rooms.find((room) => room.getId() === roomId);
  }

  removeRoom(roomId: string): void {
    this.rooms = this.rooms.filter((room) => room.getId() !== roomId);
  }
}
