import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ja'],
  defaultLocale : 'ja',
  localePrefix: 'always',
})

export type TLocales = 'en' | 'ja';
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);