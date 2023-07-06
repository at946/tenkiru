'use client';

import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';

// recoil
import { useRecoilState } from 'recoil';
import isDarkModeState from '@/recoil/atoms/isDarkModeAtom';

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
      <div className='bg-white dark:bg-neutral-900'>{children}</div>
    </div>
  );
};

export default ThemeProvider;
