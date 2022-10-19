import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from '../interfaces/member';

export interface RoomState {
  cardsAreOpen: boolean,
}

const initialState: RoomState = {
  cardsAreOpen: false
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateCardsAreOpen: (state, action: PayloadAction<boolean>) => {
      state.cardsAreOpen = action.payload
    },
  }
})

export const { updateCardsAreOpen } = roomSlice.actions
