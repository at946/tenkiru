import { atom } from 'recoil';

const isDarkModeState = atom<boolean>({
  key: 'isDarkModeState',
  default: false,
});

export default isDarkModeState;
