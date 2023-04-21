interface URLs {
  top: string;
  room: () => string;
  tos: string;
  pp: string;
}

const urls: URLs = {
  top: '/',
  room: (roomId: string): string => `/rooms/${roomId}`,
  tos: '/tos',
  pp: '/pp',
};

export default urls;
