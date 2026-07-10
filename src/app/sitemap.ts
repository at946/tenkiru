import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not set');
  }

  const lastModified = new Date();
  const locales = ['en', 'ja'];
  const pages = ['', '/pp', '/tos'];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntried(
          locales.map((locale) => [locale, `${baseUrl}/${locale}${page}`]),
        )
      },
    }));
  )
}
