'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Scroll suave (Lenis) para un desplazamiento sereno y premium en toda la web.
 * Se desactiva si el usuario prefiere movimiento reducido. Implementación
 * local (sin CDNs) — no abre huecos en la CSP.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
