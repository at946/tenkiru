const createRoomId = (): string => {
  return Math.random().toString(32).substring(2);
};

export default createRoomId;
