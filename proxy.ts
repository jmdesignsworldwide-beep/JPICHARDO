// Next 16 renombró la convención "middleware" a "proxy". next-intl sigue
// exponiendo su factory bajo 'next-intl/middleware'; solo cambia el archivo.
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Aplica el enrutado i18n a todo excepto: /api, internos de Next,
  // Vercel y cualquier archivo con extensión (assets estáticos).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
