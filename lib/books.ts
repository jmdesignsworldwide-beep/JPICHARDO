/**
 * BIBLIOTECA DE AUTOR — fuente única y escalable de los libros del
 * Pastor José Pichardo. Para añadir un libro futuro, agrega una entrada
 * aquí y su namespace i18n (messages: book / book2 / book3…). El resto del
 * sitio (hero rotativo, página Libros, fichas) se genera desde este array.
 *
 * Nota de assets: las rutas del libro nuevo se dejan cableadas aunque el
 * archivo aún no exista en /public; aparecerán al subirse.
 */

export type ChaptersLayout = 'grid12' | 'parts';

export interface BookConfig {
  id: string;
  slug: string;
  /** namespace i18n con hero/synopsis/chapters/formats/idealFor/cta */
  ns: 'book' | 'book2';
  /** portada 3D transparente (hero + mockup + ficha) */
  cover: string;
  /** fotos para la galería de la ficha */
  gallery: string[];
  /** disponibilidad de compra por libro */
  available: boolean;
  amazonUrl: string;
  /** cómo se listan los capítulos en la ficha */
  chaptersLayout: ChaptersLayout;
}

export const BOOKS: BookConfig[] = [
  {
    id: 'comenzando',
    slug: 'comenzando-mi-viaje',
    ns: 'book',
    cover: '/libro-portada-transparent.png',
    gallery: ['/libro-foto-2.png', '/libro-foto-3.png', '/libro-portada-transparent.png'],
    available: false,
    amazonUrl: '',
    chaptersLayout: 'grid12',
  },
  {
    id: 'relaciones',
    slug: 'relaciones-interpersonales',
    ns: 'book2',
    cover: '/relaciones-portada.png',
    gallery: ['/relaciones-foto-1.png', '/relaciones-foto-2.png', '/relaciones-foto-3.png'],
    available: false,
    amazonUrl: '',
    chaptersLayout: 'parts',
  },
];
