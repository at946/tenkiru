import { AllLocales, LocalePrefix } from 'next-intl/dist/types/src/shared/types';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales: AllLocales = ['en', 'ja'];
export type TLocales = 'en' | 'ja';
export const localePrefix: LocalePrefix = 'always';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
