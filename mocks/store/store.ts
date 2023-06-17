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

export const mockState: IFRoomState = {
  room: {
    id: '11111',
    deckType: 'fibonacci',
    isOpenPhase: false,
    users: [],
  },
};

export const mockStateWithUsers: IFRoomState = {
  room: {
    ...mockState.room,
    isOpenPhase: true,
    users: mockUsers,
  },
};
