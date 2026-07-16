import type { ReactNode } from 'react';

/**
 * Cinta (marquee) de movimiento lento y contemplativo. Duplica el contenido
 * para un bucle sin costuras. Se detiene con prefers-reduced-motion.
 */
export function Marquee({
  children,
  durationSeconds = 40,
  className = '',
}: {
  children: ReactNode;
  durationSeconds?: number;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <span className="inline-flex shrink-0">{children}</span>
        <span className="inline-flex shrink-0" aria-hidden>
          {children}
        </span>
      </div>
    </div>
  );
}
