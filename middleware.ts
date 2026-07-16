import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Enrutado i18n de next-intl: redirige "/" → "/es", detecta idioma y persiste
// la preferencia. En Next 15 (LTS, probado en Vercel) el middleware corre sin
// problemas en el edge, a diferencia de la convención "proxy" de Next 16.
export default createMiddleware(routing);

export const config = {
  // Aplica a todo excepto /api, internos de Next, Vercel y archivos con extensión.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
