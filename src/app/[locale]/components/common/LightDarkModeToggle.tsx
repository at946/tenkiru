'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import isDarkModeState from '@/jotai/atoms/isDarkModeAtom';

interface Props {
  lightModeTitle: string;
  darkModeTitle: string;
  className?: string;
}

const DarkModeToggle: NextPage<Props> = ({ lightModeTitle, darkModeTitle, className }) => {
  const [isDarkMode, setIsDarkMode] = useAtom<boolean>(isDarkModeState);

  return (
    <button
      type='button'
      onClick={() => setIsDarkMode(!isDarkMode)}
      title={isDarkMode ? darkModeTitle : lightModeTitle}
      aria-label={isDarkMode ? darkModeTitle : lightModeTitle}
      className={className}
    >
      <span
        className={clsx('text-2xl', isDarkMode ? 'icon-[mdi--white-balance-sunny]' : 'icon-[mdi--moon-and-stars]')}
      />
    </button>
  );
};

export default DarkModeToggle;
