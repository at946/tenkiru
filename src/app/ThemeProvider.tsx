'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  return (
    <NextThemeProvider attribute='class' disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
