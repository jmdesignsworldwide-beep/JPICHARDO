import type { MetadataRoute } from 'next';
import { site } from '@/lib/config';
import { routing } from '@/i18n/routing';

const PATHS = ['', '/nosotros', '/pastor', '/libro', '/devocional', '/visitanos'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    for (const locale of routing.locales) {
      const languages: Record<string, string> = {};
      routing.locales.forEach((lng) => {
        languages[lng] = `${site.url}/${lng}${path}`;
      });

      entries.push({
        url: `${site.url}/${locale}${path}`,
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
