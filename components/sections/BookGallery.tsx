import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Galería premium de fotos reales del libro "Comenzando Mi Viaje". La portada
 * 3D transparente ocupa el cuadro central (con fondo cremita y `contain` para
 * que no se recorte); las demás son fotos ambientadas (`cover`).
 */
const PHOTOS = ['/libro-foto.png', '/libro-portada-transparent.png', '/libro-foto-3.png'];
const COVER = '/libro-portada-transparent.png';

export function BookGallery({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-3 sm:gap-4 ${className}`}>
      {PHOTOS.map((src, i) => {
        const isCover = src === COVER;
        return (
          <Reveal
            key={src}
            from="scale"
            delay={i * 0.1}
            className={`group relative aspect-[3/4] overflow-hidden rounded-xl border border-gold-500/20 ring-1 ring-gold-500/15 shadow-book transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold ${
              isCover ? 'bg-[#F3EEE3]' : 'bg-navy-900/60'
            }`}
          >
            <Image
              src={src}
              alt={`Comenzando Mi Viaje — foto del libro ${i + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 240px"
              className={`transition-transform duration-500 group-hover:scale-[1.06] ${
                isCover
                  ? 'object-contain p-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]'
                  : 'object-cover'
              }`}
            />
            {!isCover && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
