import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setCardsAreOpen: (state, action: PayloadAction<boolean>) => {
      state.cardsAreOpen = action.payload
    },
  }
})

export const { setCardsAreOpen } = roomSlice.actions
