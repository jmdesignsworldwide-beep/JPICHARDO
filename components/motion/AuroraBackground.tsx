/**
 * Fondo aurora/amanecer que respira muy lento (dorado→navy). CSS puro
 * (sin JS), GPU-friendly. Se coloca detrás del contenido con -z.
 */
export function AuroraBackground({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="aurora-layer" />
    </div>
  );
}
