import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Galería premium de fotos reales del libro "Comenzando Mi Viaje"
 * (/libro-foto.png, /libro-foto-2.png, /libro-foto-3.png). Marco dorado,
 * ring y hover con elevación + glow. Los archivos se AÑADEN (no reemplazan
 * ninguna imagen existente); si aún no están en /public, la ruta queda
 * cableada y aparecen al subirse.
 */
const PHOTOS = ['/libro-foto.png', '/libro-foto-2.png', '/libro-foto-3.png'];

export function BookGallery({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-3 sm:gap-4 ${className}`}>
      {PHOTOS.map((src, i) => (
        <Reveal
          key={src}
          delay={i * 0.08}
          className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-gold-500/20 bg-navy-900/60 ring-1 ring-gold-500/15 shadow-book transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold"
        >
          <Image
            src={src}
            alt={`Comenzando Mi Viaje — foto del libro ${i + 1}`}
            fill
            sizes="(max-width: 768px) 33vw, 240px"
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
