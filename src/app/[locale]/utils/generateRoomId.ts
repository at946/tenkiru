import { adjectives, animals, type Config, colors, uniqueNamesGenerator } from 'unique-names-generator';

const generateRoomId = (): string => {
  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: '-',
  };
  return uniqueNamesGenerator(customConfig);
};

export default generateRoomId;
