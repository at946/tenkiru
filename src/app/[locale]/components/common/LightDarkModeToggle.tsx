'use client';

import clsx from 'clsx';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}

const DarkModeToggle: NextPage<Props> = ({ className }) => {
  const t = useTranslations('Header');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark: boolean = theme === 'dark';

  return (
    <button
      type='button'
      onClick={() => (isDark ? setTheme('light') : setTheme('dark'))}
      title={isDark ? t('Switch to light mode') : t('Switch to dark mode')}
      aria-label={isDark ? t('Switch to light mode') : t('Switch to dark mode')}
      className={className}
    >
      <span className={clsx('text-2xl', isDark ? 'icon-[mdi--white-balance-sunny]' : 'icon-[mdi--moon-and-stars]')} />
    </button>
  );
};

export default DarkModeToggle;
