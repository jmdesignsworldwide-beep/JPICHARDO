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
export type GalleryLayout = 'featured' | 'grid';

export interface BookConfig {
  id: string;
  slug: string;
  /** namespace i18n con hero/synopsis/chapters/formats/idealFor/cta */
  ns: 'book' | 'book2';
  /** portada 3D transparente (hero rotativo + mockup + tarjeta de biblioteca) */
  cover: string;
  /** imagen grande de la cabecera de la ficha; si se omite, usa `cover` */
  fichaHero?: string;
  /** banner ancho opcional que encabeza la ficha (banda a todo el ancho) */
  banner?: string;
  /** fotos para la galería de la ficha */
  gallery: string[];
  /** precios por formato en USD (referencia, se muestran en la ficha) */
  prices: { ebook: number; paperback: number; hardcover: number };
  /** disponibilidad de compra por libro */
  available: boolean;
  amazonUrl: string;
  /** cómo se listan los capítulos en la ficha */
  chaptersLayout: ChaptersLayout;
  /** disposición de la galería: 'featured' = grande+medio+pequeño; 'grid' = 3 iguales */
  galleryLayout: GalleryLayout;
}

export const BOOKS: BookConfig[] = [
  {
    id: 'comenzando',
    slug: 'comenzando-mi-viaje',
    ns: 'book',
    cover: '/comenzando-portada.png',
    banner: '/libro-banner.png',
    // La cabecera de la ficha muestra el arte promocional (JPichardo + Amazon);
    // el mockup 3D transparente pasa a la galería. El `cover` transparente se
    // conserva para el hero rotativo y la tarjeta de biblioteca.
    fichaHero: '/libro-foto-2.png',
    gallery: ['/libro-foto-3.png', '/comenzando-portada.png'],
    prices: { ebook: 4.99, paperback: 12.99, hardcover: 18.99 },
    available: false,
    amazonUrl: '',
    chaptersLayout: 'grid12',
    galleryLayout: 'featured',
  },
  {
    id: 'relaciones',
    slug: 'relaciones-interpersonales',
    ns: 'book2',
    cover: '/relaciones-portada.png',
    banner: '/relaciones-banner.png',
    gallery: ['/relaciones-foto-1.png', '/relaciones-foto-2.png', '/relaciones-foto-3.png'],
    prices: { ebook: 6.99, paperback: 11.99, hardcover: 17.99 },
    available: false,
    amazonUrl: '',
    chaptersLayout: 'parts',
    galleryLayout: 'grid',
  },
];
