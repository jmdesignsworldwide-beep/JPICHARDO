import type { ReactNode } from 'react';

/**
 * Tarjeta con glassmorphism ligero sobre el navy, borde dorado sutil
 * y realce al hover.
 */
export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass rounded-2xl p-6 shadow-glass transition-all duration-300 ${
        hover ? 'hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-light' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
