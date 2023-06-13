import { configureStore } from '@reduxjs/toolkit';
import { roomSlice } from './roomSlice';
import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    [roomSlice.name]: roomSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
