import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware MÍNIMO: redirige las rutas sin prefijo de idioma al locale por
 * defecto (ES). Ej.: "/" → "/es", "/libro" → "/es/libro".
 *
 * NO se usa el middleware de next-intl porque su lógica de redirección de la
 * raíz crashea en el edge de Next 16 en Vercel (MIDDLEWARE_INVOCATION_FAILED).
 * Este handler es trivial (un único NextResponse.redirect), por lo que no puede
 * fallar en runtime, y el matcher lo limita EXCLUSIVAMENTE a las rutas sin
 * locale — nunca toca /es, /en, /api ni los assets. La i18n funciona sin
 * middleware gracias a setRequestLocale en cada página.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const suffix = pathname === '/' ? '' : pathname;
  return NextResponse.redirect(new URL(`/es${suffix}`, request.url));
}

export const config = {
  matcher: ['/', '/nosotros', '/pastor', '/libro', '/devocional', '/visitanos'],
};
