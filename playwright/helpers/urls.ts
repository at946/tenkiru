interface URLs {
  top: string;
  room: () => string;
  tos: string;
  pp: string;
}

const urls: URLs = {
  top: '/',
  room: (): string => `/rooms/${Math.random().toString(32).substring(2)}`,
  tos: '/tos',
  pp: '/pp',
};

export default urls;
