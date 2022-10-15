global.urls = {
  top: `${process.env.TARGET_URL}/`,
  room: () => `${process.env.TARGET_URL}/rooms/${Math.random().toString(32).substring(2)}`,
};
