import type { Room } from '@/class/room';

interface args {
  rooms: Room[];
  roomId: string;
}

const findRoomById = ({ rooms, roomId }: args): Room | undefined => {
  return rooms.find((room: Room) => room.getId() === roomId);
};

export default findRoomById;
