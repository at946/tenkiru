const baseUrl = process.env.TARGET_URL;

global.urls = {
  top: `${baseUrl}/`,
  room: () => `${baseUrl}/rooms/${Math.random().toString(32).substring(2)}`,
  tos: `${baseUrl}/tos`,
  pp: `${baseUrl}/pp`,
};
