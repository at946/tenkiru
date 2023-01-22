const baseUrl: string = process.env.TARGET_URL || 'http://localhost:3000';

interface URLs {
  top: string,
  room: () => string,
  tos: string,
  pp: string,
}

const urls: URLs = {
  top: `${baseUrl}/`,
  room: () => `${baseUrl}/rooms/${Math.random().toString(32).substring(2)}`,
  tos: `${baseUrl}/tos`,
  pp: `${baseUrl}/pp`,
};

export default urls;
