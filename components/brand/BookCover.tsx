/**
 * Portada de "Comenzando Mi Viaje" reconstruida como SVG editorial:
 * amanecer (dorado→navy), sendero, marco ornamental dorado, título,
 * subtítulo, autor, Salmo 119:105 y los cinco pilares.
 * Sirve de placeholder premium hasta que se cargue la portada real
 * (public/libro-comenzando-mi-viaje.webp).
 */
export function BookCover({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 600"
      className={className}
      role="img"
      aria-label="Portada del libro Comenzando Mi Viaje, por José Pichardo"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="cover-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3B76B" />
          <stop offset="20%" stopColor="#D98A4A" />
          <stop offset="42%" stopColor="#7C4A63" />
          <stop offset="66%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0A1A2F" />
        </linearGradient>
        <radialGradient id="cover-sun" cx="50%" cy="34%" r="26%">
          <stop offset="0%" stopColor="#FCE7BE" />
          <stop offset="55%" stopColor="#F3B76B" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F3B76B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cover-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A67C2E" />
          <stop offset="50%" stopColor="#F3E2AE" />
          <stop offset="100%" stopColor="#A67C2E" />
        </linearGradient>
      </defs>

      {/* Fondo cielo */}
      <rect width="400" height="600" fill="url(#cover-sky)" />
      <circle cx="200" cy="205" r="150" fill="url(#cover-sun)" />

      {/* Sendero hacia el horizonte */}
      <path d="M200 300 L235 470 L165 470 Z" fill="#0A1A2F" opacity="0.55" />
      <path d="M200 300 L212 360 L188 360 Z" fill="#F3D9A8" opacity="0.28" />
      {/* Figura dando el primer paso */}
      <g fill="#0A1A2F" opacity="0.85">
        <circle cx="200" cy="300" r="7" />
        <path d="M193 308 h14 l-2 34 h-4 l-2 -20 -2 20 h-4 z" />
      </g>

      {/* Marco ornamental dorado */}
      <rect x="18" y="18" width="364" height="564" fill="none" stroke="url(#cover-gold)" strokeWidth="1.5" />
      <rect x="24" y="24" width="352" height="552" fill="none" stroke="url(#cover-gold)" strokeWidth="0.6" opacity="0.6" />
      {/* Esquinas */}
      {[
        [18, 18, 1, 1],
        [382, 18, -1, 1],
        [18, 582, 1, -1],
        [382, 582, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <path
          key={i}
          d={`M${x} ${(y as number) + 26 * (sy as number)} L${x} ${y} L${(x as number) + 26 * (sx as number)} ${y}`}
          fill="none"
          stroke="url(#cover-gold)"
          strokeWidth="2.5"
        />
      ))}

      {/* Adorno superior */}
      <g stroke="url(#cover-gold)" strokeWidth="1" fill="none">
        <line x1="120" y1="70" x2="180" y2="70" />
        <line x1="220" y1="70" x2="280" y2="70" />
        <circle cx="200" cy="70" r="4" fill="url(#cover-gold)" stroke="none" />
      </g>

      {/* Título */}
      <text x="200" y="118" textAnchor="middle" fontFamily="Georgia, 'Playfair Display', serif" fontSize="42" fill="#F6E7B6" fontStyle="italic" fontWeight="600">
        Comenzando
      </text>
      <text x="200" y="168" textAnchor="middle" fontFamily="Georgia, 'Playfair Display', serif" fontSize="52" fill="#F6E7B6" fontStyle="italic" fontWeight="700">
        Mi Viaje
      </text>

      {/* Subtítulo */}
      <text x="200" y="205" textAnchor="middle" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="14" letterSpacing="3" fill="#F7F3EA">
        FUNDAMENTOS PARA LA VIDA CRISTIANA
      </text>

      {/* Verso */}
      <text x="200" y="500" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic" fill="#F7F3EA" opacity="0.92">
        «Tu palabra es una lámpara a mis pies…»
      </text>
      <text x="200" y="520" textAnchor="middle" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="11" letterSpacing="2" fill="#E0C173">
        SALMO 119:105
      </text>

      {/* Pilares */}
      <text x="200" y="552" textAnchor="middle" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="9.5" letterSpacing="2.5" fill="#E0C173">
        FE · ESPERANZA · PROPÓSITO
      </text>
      <text x="200" y="567" textAnchor="middle" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="9.5" letterSpacing="2.5" fill="#E0C173">
        CRECIMIENTO · COMUNIÓN
      </text>

      {/* Autor */}
      <text x="200" y="470" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fill="#F6E7B6" letterSpacing="1">
        José Pichardo
      </text>
    </svg>
  );
}
