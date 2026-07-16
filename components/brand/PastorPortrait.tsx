/**
 * Retrato placeholder del Pastor José Pichardo en marco dorado editorial.
 * Silueta con saco azul (evocando la contraportada). Marcado como
 * placeholder: cuando Marien entregue la foto en alta se coloca en
 * /public/pastor-jose-pichardo.jpg y se usa en su lugar.
 */
export function PastorPortrait({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role="img"
      aria-label="Retrato del Pastor José Pichardo (imagen de referencia, pendiente de foto final)"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="port-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12233D" />
          <stop offset="100%" stopColor="#0A1A2F" />
        </linearGradient>
        <linearGradient id="port-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A67C2E" />
          <stop offset="50%" stopColor="#E0C173" />
          <stop offset="100%" stopColor="#A67C2E" />
        </linearGradient>
        <radialGradient id="port-glow" cx="50%" cy="38%" r="45%">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0A1A2F" />
        </radialGradient>
      </defs>

      <rect width="400" height="480" fill="url(#port-bg)" />
      <rect width="400" height="480" fill="url(#port-glow)" opacity="0.8" />

      {/* Silueta */}
      <g fill="#24344b">
        {/* Hombros / saco azul */}
        <path d="M70 480 C70 380, 130 350, 200 350 C270 350, 330 380, 330 480 Z" fill="#1E3A5F" />
        {/* Camisa / clergy */}
        <path d="M175 360 L200 420 L225 360 L215 350 L185 350 Z" fill="#0A1A2F" />
        {/* Cuello */}
        <rect x="182" y="322" width="36" height="44" rx="10" fill="#3a4a5f" />
        {/* Cabeza */}
        <ellipse cx="200" cy="250" rx="62" ry="72" fill="#3a4a5f" />
        {/* Cabello */}
        <path d="M138 240 C140 190, 260 190, 262 240 C262 210, 240 188, 200 188 C160 188, 138 210, 138 240 Z" fill="#22303f" />
      </g>

      {/* Marco ornamental dorado */}
      <rect x="14" y="14" width="372" height="452" fill="none" stroke="url(#port-gold)" strokeWidth="2" />
      <rect x="20" y="20" width="360" height="440" fill="none" stroke="url(#port-gold)" strokeWidth="0.6" opacity="0.6" />

      <text x="200" y="452" textAnchor="middle" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="11" letterSpacing="2.5" fill="#E0C173" opacity="0.85">
        PASTOR JOSÉ PICHARDO
      </text>
    </svg>
  );
}
