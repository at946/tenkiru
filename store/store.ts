import { configureStore } from '@reduxjs/toolkit';
import { roomSlice } from './roomSlice';
import { themeSlice } from './darkModeSlice';

export const store = configureStore({
  reducer: {
    [roomSlice.name]: roomSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
