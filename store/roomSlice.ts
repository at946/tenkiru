import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '@/class/room';
import { DeckType } from '@/interfaces/deckType';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

export interface IFTableCard {
  playerId: string;
  value: IFTableCardValue;
}

export interface IFTable {
  cards: IFTableCard[];
  cardsAreOpen: boolean;
}

export interface IFRoom {
  id: string;
  table: IFTable;
  deckType: DeckType;
}

export interface RoomState {
  room: IFRoom;
}

const initialState: RoomState = {
  room: {
    id: null,
    table: {
      cards: [],
      cardsAreOpen: false,
    },
    deckType: 'fibonacci',
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
