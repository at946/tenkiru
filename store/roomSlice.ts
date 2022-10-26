import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../interfaces/card';
import { DeckType } from '../interfaces/deckType';

export interface RoomState {
  cardsAreOpen: boolean;
  deckType: DeckType;
  customDeck?: Card[];
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
    setCustomDeck: (state, action: PayloadAction<Card[]>) => {
      state.customDeck = action.payload;
    },
  },
});

export const { setCardsAreOpen, setDeckType, setCustomDeck } = roomSlice.actions;
