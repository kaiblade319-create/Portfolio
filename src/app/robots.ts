import type { MetadataRoute } from 'next';
import { resolveSiteUrl } from '@/lib/portfolio-utils';

const siteUrl = resolveSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
