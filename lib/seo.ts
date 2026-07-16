import type { Metadata } from 'next';
import { site } from './config';
import { routing, type Locale } from '@/i18n/routing';

const BASE_URL = site.url;

/**
 * Construye metadata coherente (title, description, OpenGraph, Twitter,
 * alternates hreflang) para cada página.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = '',
}: {
  locale: string;
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle =
    path === '' ? `${site.name} · ${title}` : `${title} · ${site.name}`;
  const canonical = `${BASE_URL}/${locale}${path}`;

  const languages: Record<string, string> = {};
  routing.locales.forEach((lng) => {
    languages[lng] = `${BASE_URL}/${lng}${path}`;
  });

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

export function localeToOg(locale: Locale) {
  return locale === 'en' ? 'en_US' : 'es_ES';
}
