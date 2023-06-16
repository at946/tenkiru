import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFRoom } from '@/interfaces/room';

export interface IFRoomState {
  room: IFRoom;
}

const initialState: IFRoomState = {
  room: {
    id: null,
    deckType: 'fibonacci',
    isOpenPhase: false,
    users: [],
  },
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom: (state, action: PayloadAction<IFRoom>) => {
      state.room = action.payload;
    },
  },
});

export const { updateRoom } = roomSlice.actions;
