import type { IFRoom } from '@/interfaces/room';
import { atom } from 'recoil';

const roomState = atom<IFRoom>({
  key: 'roomState',
  default: {
    id: '',
    deckType: 'fibonacci',
    isOpenPhase: false,
    users: [],
  },
});

export default roomState;
