import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Mosaico premium de publicaciones reales del Devocional Biblia Abierta.
 * Cada cuadro carga /devocional-N.jpg (posts cuadrados de redes) con el mismo
 * tratamiento: borde dorado, ring, hover con elevación y glow dorado.
 *
 * Nota de assets: si un archivo aún no está en /public, la ruta queda cableada
 * y la imagen aparece automáticamente en cuanto Marien la suba.
 */
export function DevotionalGrid({
  count = 6,
  columns = 3,
  className = '',
}: {
  count?: number;
  columns?: 3 | 4;
  className?: string;
}) {
  const cols = columns === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3';
  return (
    <div className={`grid grid-cols-2 gap-3 ${cols} ${className}`}>
      {Array.from({ length: count }, (_, i) => i + 1).map((n, i) => (
        <Reveal
          key={n}
          delay={(i % columns) * 0.05}
          className="group relative aspect-square overflow-hidden rounded-xl border border-gold-500/20 bg-navy-900/60 ring-1 ring-gold-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold"
        >
          <Image
            src={`/devocional-${n}.jpg`}
            alt={`Devocional Biblia Abierta — publicación ${n}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Reveal>
      ))}
    </div>
  );
}
