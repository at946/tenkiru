'use client';

import isDarkModeState from '@/recoil/atoms/isDarkModeAtom';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useRecoilState } from 'recoil';

interface Props {
  lightModeTitle: string;
  darkModeTitle: string;
  className?: string;
}

const DarkModeToggle: NextPage<Props> = ({ lightModeTitle, darkModeTitle, className }) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeState);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      title={isDarkMode ? darkModeTitle : lightModeTitle}
      aria-label={isDarkMode ? darkModeTitle : lightModeTitle}
      className={className}
    >
      <span
        className={clsx(
          'text-2xl',
          isDarkMode ? 'icon-[mdi--white-balance-sunny]' : 'icon-[mdi--moon-and-stars]',
        )}
      />
    </button>
  );
};

export default DarkModeToggle;
