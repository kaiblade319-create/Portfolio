import type { MetadataRoute } from 'next';
import { projects } from '@/app/lib/data';
import { resolveSiteUrl } from '@/lib/portfolio-utils';

const siteUrl = resolveSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectEntries,
  ];
}
