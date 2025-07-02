'use client';

import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import { type ReactNode, useEffect } from 'react';
import isDarkModeState from '@/jotai/atoms/isDarkModeAtom';

interface Props {
  children: ReactNode;
}

const ThemeProvider: NextPage<Props> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useAtom<boolean>(isDarkModeState);

  useEffect(() => {
    if (localStorage.theme !== undefined) {
      setIsDarkMode(localStorage.theme === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, [setIsDarkMode]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className='bg-background text-text dark:bg-dark-background dark:text-dark-text'>{children}</div>
    </div>
  );
};

export default ThemeProvider;
