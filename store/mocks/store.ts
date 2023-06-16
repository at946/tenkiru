import { Store, configureStore } from '@reduxjs/toolkit';
import { membersSlice } from '../membersSlice';
import { IFRoomState, roomSlice } from '../roomSlice';
import { userSlice } from '../userSlice';

export const mockState: IFRoomState = {
  room: {
    id: '11111',
    deckType: 'fibonacci',
    isOpenPhase: false,
    users: [
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
};

export const mockStore = (preloadedState?: IFRoomState): Store =>
  configureStore({
    reducer: {
      [roomSlice.name]: roomSlice.reducer,
      [membersSlice.name]: membersSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
    preloadedState: preloadedState,
  });
