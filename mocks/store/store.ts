import { Store, configureStore } from '@reduxjs/toolkit';
import { IFRoomState, roomSlice } from '@/store/roomSlice';
import { IFUser } from '@/interfaces/user';

export const mockStore = (preloadedState: IFRoomState): Store =>
  configureStore({
    reducer: {
      [roomSlice.name]: roomSlice.reducer,
    },
    preloadedState: { room: preloadedState },
  });

const mockUsers: IFUser[] = [
  {
    id: '1',
    type: 'player',
    selectedCardValue: 1,
  },
  {
    id: '2',
    type: 'player',
    selectedCardValue: 2,
  },
  {
    id: '3',
    type: 'player',
    selectedCardValue: null,
  },
  {
    id: '4',
    type: 'audience',
    selectedCardValue: null,
  },
];

export const defaultMockState: IFRoomState = {
  room: {
    id: '11111',
    deckType: 'fibonacci',
    isOpenPhase: false,
    users: [],
  },
};

export const closePhaseMockState: IFRoomState = {
  room: {
    ...defaultMockState,
    users: mockUsers,
  },
};

export const openPhaseMockState: IFRoomState = {
  room: {
    ...closePhaseMockState,
    isOpenPhase: true,
  },
};
