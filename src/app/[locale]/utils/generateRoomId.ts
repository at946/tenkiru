import { adjectives, animals, type Config, colors, uniqueNamesGenerator } from 'unique-names-generator';
import type { IFRoomId } from '@/interfaces/room';

const generateRoomId = (): IFRoomId => {
  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: '-',
  };
  return uniqueNamesGenerator(customConfig);
};

export default generateRoomId;
