import { configureStore } from '@reduxjs/toolkit';
import { roomSlice } from './roomSlice';

export const store = configureStore({
  reducer: {
    [roomSlice.name]: roomSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
