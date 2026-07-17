import Image from 'next/image';
import { site } from '@/lib/config';

/**
 * Logo real de JPichardo Ministries (emblema + wordmark) en alta resolución.
 * El PNG es TRANSPARENTE (recortado), así que se muestra directamente sobre el
 * fondo oscuro — nunca sobre un recuadro claro. Para el emblema pequeño en
 * Header/Footer se usa la versión recortada logo-jpichardo-emblem.png.
 */
export function BrandLogo({
  className = '',
  width = 340,
  priority = false,
}: {
  className?: string;
  width?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-jpichardo.png"
      alt={`${site.ministry} — logo`}
      width={width}
      height={width}
      priority={priority}
      sizes="(max-width: 768px) 60vw, 340px"
      className={className}
    />
  );
}
