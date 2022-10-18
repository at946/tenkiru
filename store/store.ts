import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { membersSlice } from './membersSlice';

export const store = configureStore({
  reducer: {
    [membersSlice.name]: membersSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch