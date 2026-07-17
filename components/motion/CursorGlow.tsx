'use client';

import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

/**
 * Glow dorado sutil que sigue el cursor en desktop. pointer-events-none
 * (no molesta clicks), oculto en móvil y con prefers-reduced-motion.
 */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.2 });
  const background = useMotionTemplate`radial-gradient(260px circle at ${sx}px ${sy}px, rgba(224,193,115,0.09), transparent 70%)`;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
    />
  );
}
