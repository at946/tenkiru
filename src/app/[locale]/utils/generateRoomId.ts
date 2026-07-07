import { v4 } from 'uuid';

const generateRoomId = (): string => {
  return v4();
};

export default generateRoomId;

export type roomId = string;
