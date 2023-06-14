import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/class/user';
import { IFMemberType } from '../interfaces/memberType';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

export interface IFUser {
  id: string;
  type: IFMemberType;
  selectedCardValue: IFTableCardValue;
}

export interface IFUserState {
  user: IFUser;
}

const initialState: IFUserState = {
  user: {
    id: '',
    type: 'player',
    selectedCardValue: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
