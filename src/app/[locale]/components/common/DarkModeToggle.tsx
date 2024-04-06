'use client';

import isDarkModeState from '@/recoil/atoms/isDarkModeAtom';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useRecoilState } from 'recoil';
import HeaderItem from './HeaderItem';

interface Props {
  lightModeTitle: string;
  darkModeTitle: string;
  className?: string;
}

const DarkModeToggle: NextPage = (props: Props) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeState);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      title={isDarkMode ? props.darkModeTitle : props.lightModeTitle}
      aria-label={isDarkMode ? props.darkModeTitle : props.lightModeTitle}
      className={props.className}
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
