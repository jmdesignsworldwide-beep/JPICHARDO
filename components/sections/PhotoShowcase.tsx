import Image from 'next/image';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { OrnamentFrame } from '@/components/ui/OrnamentFrame';

/**
 * Muestra una imagen editorial COMPLETA (composición de marca ya diseñada,
 * con su propio texto) dentro de un marco premium. No se recorta ni se
 * superpone texto encima, para respetar el arte tal cual fue entregado.
 */
export function PhotoShowcase({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  priority?: boolean;
}) {
  return (
    <Reveal className="mx-auto w-full max-w-3xl">
      <OrnamentFrame className="p-3 sm:p-4">
        <div className="border-beam overflow-hidden rounded-xl shadow-book ring-1 ring-gold-500/25">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes="(max-width: 768px) 92vw, 768px"
            className="block h-auto w-full"
          />
        </div>
      </OrnamentFrame>
      {caption && (
        <p className="mx-auto mt-5 max-w-xl text-center text-sm text-cream-50/60">
          {caption}
        </p>
      )}
    </Reveal>
  );
}
