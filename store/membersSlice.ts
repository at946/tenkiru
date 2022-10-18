import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Member } from '../interfaces/member';

export interface MembersState {
  members: Member[]
}

const initialState: MembersState = {
  members: []
}

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateMembers: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload
    },
  }
})

export const { updateMembers } = membersSlice.actions
export const selectMembers = (state: RootState) => state.members.members
export default membersSlice.reducer
