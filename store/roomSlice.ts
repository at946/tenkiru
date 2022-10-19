import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeckType } from '../interfaces/deckType';

export interface RoomState {
  cardsAreOpen: boolean;
  deckType: DeckType;
}

const initialState: RoomState = {
  cardsAreOpen: false,
  deckType: 'fibonacci',
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setCardsAreOpen: (state, action: PayloadAction<boolean>) => {
      state.cardsAreOpen = action.payload;
    },
    setDeckType: (state, action: PayloadAction<DeckType>) => {
      state.deckType = action.payload;
    },
  },
});

export const { setCardsAreOpen, setDeckType } = roomSlice.actions;
