const baseUrl = process.env.TARGET_URL;

const urls = {
  top: `${baseUrl}/`,
  room: () => `${baseUrl}/rooms/${Math.random().toString(32).substring(2)}`,
  tos: `${baseUrl}/tos`,
  pp: `${baseUrl}/pp`,
};

export default urls;
