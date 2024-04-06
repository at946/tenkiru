import { localePrefix, locales } from '@/navigation';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: locales,
  defaultLocale: 'en',
  localePrefix: localePrefix,
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
