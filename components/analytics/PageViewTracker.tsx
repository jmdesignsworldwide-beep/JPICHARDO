'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from './track';

/**
 * Registra una visita cada vez que cambia la ruta (páginas públicas). No
 * registra el portal ni /api (filtrado también en el servidor). Sin IP.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (pathname === last.current) return;
    if (pathname.startsWith('/portal') || pathname.startsWith('/api')) return;
    last.current = pathname;
    const seg = pathname.split('/')[1];
    const locale = seg === 'en' ? 'en' : seg === 'es' ? 'es' : undefined;
    track({ type: 'page', path: pathname, locale });
  }, [pathname]);

  return null;
}
