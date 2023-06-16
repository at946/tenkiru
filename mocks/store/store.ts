import { Store, configureStore } from '@reduxjs/toolkit';
import { IFRoomState, roomSlice } from '@/store/roomSlice';
import { IFUser } from '@/interfaces/user';

export const mockStore = (preloadedState?: IFRoomState): Store =>
  configureStore({
    reducer: {
      [roomSlice.name]: roomSlice.reducer,
    },
    preloadedState: preloadedState,
  });

const mockUsers: IFUser[] = [
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
