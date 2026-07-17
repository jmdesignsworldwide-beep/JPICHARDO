'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * Motas de luz dorada que flotan lento hacia arriba (polvo dorado / luciérnagas
 * tenues) detrás del contenido — "luz en el sendero" (Salmo 119:105).
 * CSS transform/opacity, densidad baja. Se apaga con prefers-reduced-motion.
 */
const MOTES = Array.from({ length: 16 }, (_, i) => i);

export function GoldParticles({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {MOTES.map((i) => {
        const left = (i * 61) % 100;
        const size = 2 + (i % 3);
        const duration = 15 + (i % 7) * 3;
        const delay = -(i * 2.3);
        const drift = (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 6);
        return (
          <span
            key={i}
            className="gold-mote"
            style={
              {
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                '--mote-drift': `${drift}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
