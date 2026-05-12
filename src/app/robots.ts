import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/rooms/', '/*/rooms/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
