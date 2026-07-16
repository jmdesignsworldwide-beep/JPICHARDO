/**
 * Fuente única de verdad de los datos verídicos del sitio (sección 3 del brief).
 * NO inventar datos. Cualquier cambio de contacto/redes se hace SOLO aquí.
 */

// EL LIBRO — disponibilidad controlada desde lib/book.ts (fuente única).
// Se re-exporta aquí por conveniencia.
export { BOOK_AVAILABLE, BOOK_AMAZON_URL } from './book';

export const site = {
  name: 'Blessing House',
  ministry: 'JPichardo Ministries',
  url: 'https://blessinghouse.co',
  domain: 'blessinghouse.co',
  address: {
    line: '70 West Merrick RD',
    city: 'Freeport',
    state: 'NY',
    zip: '11520',
    country: 'United States',
    full: '70 West Merrick RD, Freeport, NY 11520, United States',
  },
  phone: '+1 516-444-9094',
  phoneHref: '+15164449094',
  email: 'blessinghousecchurch@gmail.com',
  social: {
    facebook: 'https://www.facebook.com/blessinghouse07',
    instagram: 'https://www.instagram.com/devocionalbibliaabierta',
    tiktok: 'https://www.tiktok.com/@devocionalbibliaabierta',
    linktree: 'https://linktr.ee/Blessing_House',
  },
  // Devocional Biblia Abierta (DBA / DVA)
  devotional: {
    instagramHandle: '@devocionalbibliaabierta',
    tiktokHandle: '@devocionalbibliaabierta',
    tiktokFollowers: '16.3K',
  },
  credit: 'JM Designs Worldwide',
} as const;

// Google Maps embed — dirección exacta de Freeport.
export const MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=70+West+Merrick+Rd,+Freeport,+NY+11520&output=embed';
export const MAPS_LINK =
  'https://www.google.com/maps/search/?api=1&query=70+West+Merrick+Rd,+Freeport,+NY+11520';

// Pilares visuales de la portada del libro (iconografía recurrente).
export const PILLARS = [
  'fe',
  'esperanza',
  'proposito',
  'crecimiento',
  'comunion',
] as const;
export type Pillar = (typeof PILLARS)[number];

// Los 12 capítulos / temas del libro (orden oficial de la contraportada).
export const CHAPTER_KEYS = [
  'salvacion',
  'senorio',
  'bautismo',
  'cena',
  'valorBiblia',
  'oracion',
  'fe',
  'espirituSanto',
  'evangelizacion',
  'compromisos',
  'caracter',
  'perseverancia',
] as const;
export type ChapterKey = (typeof CHAPTER_KEYS)[number];

// Assets. Se usan componentes SVG in-line como marca por defecto (crisp,
// sin peticiones externas, sin riesgo CSP). Si Marien entrega los archivos
// reales (logo-jpichardo.png / libro-comenzando-mi-viaje.webp / foto del
// pastor en alta), se colocan en /public y se cambian estas rutas.
export const assets = {
  // Rutas reservadas para cuando lleguen los binarios reales:
  logo: '/logo-jpichardo.png',
  bookCover: '/libro-comenzando-mi-viaje.webp',
  pastorPhoto: '/pastor-jose-pichardo.jpg',
  // Por defecto usamos los componentes de marca in-line (ver components/brand).
  useInlineBrand: true,
} as const;
