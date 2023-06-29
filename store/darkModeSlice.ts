import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFThemeState {
  isDark: boolean;
}

const initialState: IFThemeState = {
  isDark: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
      localStorage.theme = action.payload ? 'dark' : 'light';
    },
  },
});

export const { setIsDark } = themeSlice.actions;
