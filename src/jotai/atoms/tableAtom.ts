import { atom } from 'jotai';

type Table = {
  selectedPlayerId: string | null;
};

const tableAtom = atom<Table>({
  selectedPlayerId: null,
});

export default tableAtom;
