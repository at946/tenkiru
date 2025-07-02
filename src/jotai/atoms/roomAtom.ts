import { atom } from 'jotai';
import type { IFRoom } from '@/interfaces/room';

const roomState = atom<IFRoom>({
  id: '',
  deckType: 'fibonacci',
  isOpenPhase: false,
  users: [],
});

export default roomState;
