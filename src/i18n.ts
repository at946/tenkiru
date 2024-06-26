import type { LocalePrefix, Locales } from 'next-intl/dist/types/src/routing/types';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales: Locales = ['en', 'ja'];
export type TLocales = 'en' | 'ja';
export const localePrefix: LocalePrefix = 'always';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
