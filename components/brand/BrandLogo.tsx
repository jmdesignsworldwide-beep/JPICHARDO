import Image from 'next/image';
import { site } from '@/lib/config';

/**
 * Logo real de JPichardo Ministries (emblema + wordmark) en alta resolución.
 * El PNG trae fondo crema (~cream-50), por lo que se presenta sobre un panel
 * crema redondeado para que lea como un sello impreso, coherente en cualquier
 * sección. Para el emblema pequeño en Header/Footer se usa el SVG in-line.
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
