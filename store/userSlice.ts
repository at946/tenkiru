import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../interfaces/card';
import { MemberType } from '../interfaces/memberType';

export interface userState {
  type: MemberType
  selectedCard: Card
}

const initialState: userState = {
  type: 'player',
  selectedCard: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateType: (state, action: PayloadAction<MemberType>) => {
      state.type = action.payload
    },
    selectCard: (state, action: PayloadAction<Card>) => {
      state.selectedCard = action.payload
    }
  }
})

export const { updateType, selectCard } = userSlice.actions