import { site } from '@/lib/config';

/**
 * Marca JPichardo Ministries — monograma JP dentro de un círculo con un
 * libro abierto, en dorado/plata. SVG in-line: nítido, sin peticiones
 * externas y sin riesgo de CSP. Cuando llegue el logo real (logo-jpichardo.png)
 * puede sustituirse actualizando lib/config.ts.
 */
export function Logo({
  size = 44,
  className = '',
  title = site.ministry,
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="jp-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A67C2E" />
          <stop offset="45%" stopColor="#E0C173" />
          <stop offset="75%" stopColor="#C9A24B" />
          <stop offset="100%" stopColor="#A67C2E" />
        </linearGradient>
        <linearGradient id="jp-silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A9099" />
          <stop offset="50%" stopColor="#E7EAEE" />
          <stop offset="100%" stopColor="#9BA1A9" />
        </linearGradient>
      </defs>

      {/* Anillo exterior */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="url(#jp-gold)" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="url(#jp-silver)" strokeWidth="0.8" opacity="0.7" />

      {/* Libro abierto estilizado */}
      <g stroke="url(#jp-gold)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 34 C42 29, 30 29, 24 33 L24 61 C30 57, 42 57, 50 62" />
        <path d="M50 34 C58 29, 70 29, 76 33 L76 61 C70 57, 58 57, 50 62" />
        <line x1="50" y1="34" x2="50" y2="62" opacity="0.6" />
      </g>

      {/* Monograma JP */}
      <text
        x="50"
        y="52"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="20"
        fontWeight="700"
        fill="url(#jp-silver)"
        opacity="0.95"
      >
        JP
      </text>

      {/* Rayo de luz inferior (sendero/lámpara) */}
      <path d="M34 72 L50 66 L66 72" stroke="url(#jp-gold)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
