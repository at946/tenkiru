import { atom } from 'recoil';

const isDarkModeState = atom({
  key: 'isDarkModeState',
  default: false,
});

export default isDarkModeState;
