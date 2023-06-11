import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeckType } from '../interfaces/deckType';

export interface RoomState {
  areCardsOpen: boolean;
  deckType: DeckType;
}

const initialState: RoomState = {
  areCardsOpen: false,
  deckType: 'fibonacci',
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setAreCardsOpen: (state, action: PayloadAction<boolean>) => {
      state.areCardsOpen = action.payload;
    },
    setDeckType: (state, action: PayloadAction<DeckType>) => {
      state.deckType = action.payload;
    },
  },
});

export const { setAreCardsOpen, setDeckType } = roomSlice.actions;
