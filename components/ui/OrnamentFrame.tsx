import type { ReactNode } from 'react';

/**
 * Marco ornamental sutil con esquinas doradas (evoca el diseño editorial
 * del libro). Envuelve secciones o tarjetas destacadas sin recargar.
 */
export function OrnamentFrame({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const corner =
    'pointer-events-none absolute h-6 w-6 border-gold-500/60';
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className={`${corner} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${corner} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${corner} bottom-0 right-0 border-b border-r`} />
      {children}
    </div>
  );
}
