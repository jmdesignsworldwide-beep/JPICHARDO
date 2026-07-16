import Image from 'next/image';

/**
 * Retrato real del Pastor José Pichardo (alta resolución).
 * Reemplaza el placeholder SVG anterior. Se muestra dentro de marcos premium
 * en la página del Pastor y en el teaser del Inicio.
 */
export function PastorPortrait({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/pastor-jose-pichardo.jpg"
      alt="Pastor José Pichardo"
      width={1176}
      height={1280}
      sizes="(max-width: 768px) 90vw, 420px"
      className={`block h-auto w-full ${className}`}
      priority={false}
    />
  );
}
