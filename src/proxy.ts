import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const proxy = createMiddleware(routing);
export { proxy };

export const config = {
  matcher: [
    /*
     * 次のパス以外にマッチさせる（MiddlewareとSentry計測の対象外にする）:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data (Next.js data prefetching)
     * - _vercel (Vercel internal requests)
     * - sentry-tunnel (Sentry tunnel route)
     * - 静的ファイルと画像アセット (favicon, robots.txt, sitemap.xml, manifest.json, 各種画像拡張子)
     */
    '/((?!api|_next/static|_next/data|_next/image|_vercel|sentry-tunnel|favicon.ico|robots.txt|sitemap.xml|manifest.json|ads.txt|audio/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|opengraph-image.jpg)$).*)',
  ],
};
