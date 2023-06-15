import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFRoom } from '@/interfaces/room';

export interface RoomState {
  room: IFRoom;
}

const initialState: RoomState = {
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
    updateRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
  },
});

export const { updateRoom } = roomSlice.actions;
