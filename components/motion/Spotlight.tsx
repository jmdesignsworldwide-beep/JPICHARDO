'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion';

/**
 * Foco de luz dorada muy sutil que sigue al cursor dentro del hero.
 * pointer-events-none (no bloquea clicks) y escucha el mouse a nivel de
 * ventana. Oculto en móvil y con movimiento reducido.
 */
export function Spotlight() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(224,193,115,0.10), transparent 72%)`;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      <motion.div className="absolute inset-0" style={{ background }} />
    </div>
  );
}
