import { atom } from 'jotai';
import type { IFRoom } from '@/interfaces/room';

const roomAtom = atom<IFRoom>({
  id: '',
  deckType: 'fibonacci',
  isOpenPhase: false,
  users: [],
  selectedPlayerId: null,
});

export default roomAtom;
