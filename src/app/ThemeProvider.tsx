'use client';

import isDarkModeState from '@/recoil/atoms/isDarkModeAtom';
import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  children: ReactNode;
}

const ThemeProvider: NextPage<Props> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeState);

  useEffect(() => {
    if (localStorage.theme !== undefined) {
      setIsDarkMode(localStorage.theme === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, [setIsDarkMode]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className='bg-background text-text dark:bg-dark-background dark:text-dark-text'>
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
