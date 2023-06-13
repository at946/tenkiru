import { Room } from './room';

export class Rooms {
  constructor(private rooms: Room[] = []) {}

  addRoom(room: Room): void {
    this.rooms.push(room);
  }

  findRoom(roomId: string): Room | undefined {
    return this.rooms.find((room) => room.getId() === roomId);
  }
}
