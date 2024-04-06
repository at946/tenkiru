import { AllLocales, LocalePrefix } from 'next-intl/dist/types/src/shared/types';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales: AllLocales = ['en', 'ja'] as const;
export const localePrefix: LocalePrefix = 'always';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix,
});
