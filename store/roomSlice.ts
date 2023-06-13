import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeckType } from '../interfaces/deckType';
import { Room } from '@/class/room';

export interface RoomState {
  room: Room;
}

const initialState: RoomState = {
  room: new Room(),
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
