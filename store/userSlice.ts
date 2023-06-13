import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../interfaces/card';
import { MemberType } from '../interfaces/memberType';
import { User } from '@/class/user';

export interface userState {
  user: User;
}

const initialState: userState = {
  user: new User(),
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
