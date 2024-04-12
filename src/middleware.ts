import { localePrefix, locales } from '@/i18n';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: locales,
  defaultLocale: 'en',
  localePrefix: localePrefix,
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|audio/|ads.txt|opengraph-image.jpg).*)'],
};
