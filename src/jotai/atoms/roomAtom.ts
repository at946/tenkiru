import type { IFRoom } from '@/interfaces/room';
import { atom } from 'jotai';

const roomState = atom<IFRoom>({
  id: '',
  deckType: 'fibonacci',
  isOpenPhase: false,
  users: [],
});

export default roomState;
