import { Store, configureStore } from '@reduxjs/toolkit';
import { membersSlice } from '../membersSlice';
import { roomSlice } from '../roomSlice';
import { userSlice } from '../userSlice';
import { DeckType } from '@/interfaces/deckType';
import { Member } from '@/interfaces/member';
import { MemberType } from '@/interfaces/memberType';
import { Card } from '@/interfaces/card';

export interface MockState {
  room: {
    cardsAreOpen: boolean;
    deckType: DeckType;
  };
  members: {
    members: Member[];
  };
  user: {
    type: MemberType;
    selectedCard: Card;
  };
}

export const mockState: MockState = {
  room: {
    cardsAreOpen: true,
    deckType: 'fibonacci',
  },
  members: {
    members: [
      {
        id: '1',
        type: 'player',
        selectedCard: 1,
      },
      {
        id: '2',
        type: 'player',
        selectedCard: 2,
      },
      {
        id: '3',
        type: 'player',
        selectedCard: null,
      },
      {
        id: '4',
        type: 'audience',
        selectedCard: null,
      },
    ],
  },
  user: {
    type: 'player',
    selectedCard: 1,
  },
};

export const mockStore = (preloadedState?: MockState): Store =>
  configureStore({
    reducer: {
      [roomSlice.name]: roomSlice.reducer,
      [membersSlice.name]: membersSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
    preloadedState: preloadedState,
  });
