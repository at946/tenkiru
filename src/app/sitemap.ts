import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
  const locales = ['en', 'ja'];
  const pages = ['', '/pp', '/tos'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  return sitemapEntries;
}
