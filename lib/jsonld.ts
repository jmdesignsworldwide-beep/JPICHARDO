import { site } from './config';

const sameAs = [
  site.social.facebook,
  site.social.instagram,
  site.social.tiktok,
  site.social.linktree,
];

// Iglesia / Organización (site-wide)
export const churchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  logo: `${site.url}/logo-jpichardo.png`,
  image: `${site.url}/logo-jpichardo.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  sameAs,
};

// El libro
export const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Comenzando Mi Viaje',
  alternateName: 'Comenzando Mi Viaje: Fundamentos para la Vida Cristiana',
  inLanguage: 'es',
  numberOfPages: 12,
  bookFormat: 'https://schema.org/Paperback',
  author: { '@type': 'Person', name: 'José Pichardo' },
  publisher: { '@type': 'Organization', name: site.ministry },
  about: 'Fundamentos para la Vida Cristiana',
};

// El pastor
export const pastorJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'José Pichardo',
  jobTitle: 'Pastor',
  worksFor: { '@type': 'Organization', name: site.name },
  affiliation: { '@type': 'Organization', name: site.ministry },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Freeport',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  sameAs,
};
