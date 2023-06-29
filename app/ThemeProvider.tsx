'use client';

import { setIsDark } from '@/store/darkModeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const ThemeProvider: NextPage<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isDark: boolean = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    if (localStorage.theme !== undefined) {
      dispatch(setIsDark(localStorage.theme === 'dark'));
    } else {
      const isSystemDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setIsDark(isSystemDarkMode));
    }
  }, [dispatch]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className='bg-white dark:bg-neutral-900'>{children}</div>
    </div>
  );
};

export default ThemeProvider;
