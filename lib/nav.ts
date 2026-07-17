/**
 * Ítems de navegación compartidos entre Header (client) y Footer (server).
 * Debe vivir en un módulo NO-client para poder mapearse desde el servidor.
 */
export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/nosotros', key: 'about' },
  { href: '/pastor', key: 'pastor' },
  { href: '/libros', key: 'book' },
  { href: '/devocional', key: 'devotional' },
  { href: '/visitanos', key: 'visit' },
] as const;
