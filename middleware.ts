// Se usa la convención "middleware.ts" (probada en Vercel) en lugar de la
// nueva "proxy.ts" de Next 16, para garantizar que el enrutado i18n corra en
// producción y que "/" redirija a "/es". next-intl expone su factory aquí.
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Aplica el enrutado i18n a todo excepto: /api, internos de Next,
  // Vercel y cualquier archivo con extensión (assets estáticos).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
