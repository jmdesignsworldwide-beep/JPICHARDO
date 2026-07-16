const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// ─────────────────────────────────────────────────────────────
// FORT KNOX — Security headers (activos desde la línea 1).
// CSP endurecida: sin claves, sin orígenes innecesarios.
// frame-src permite SOLO el mapa de Google en /visitanos.
// ─────────────────────────────────────────────────────────────
const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js inyecta scripts inline para hidratación; framer-motion es 'self'.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  // Mapa embebido de Google Maps en Visítanos.
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // Elimina console.* en producción (evita fugas accidentales en logs cliente).
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  // Enrutado de idioma a nivel de plataforma (sin middleware): la raíz y las
  // rutas sin prefijo de idioma redirigen al locale por defecto (ES). Esto es
  // routing estático de Vercel — no puede fallar en runtime como el middleware.
  async redirects() {
    const paths = ['nosotros', 'pastor', 'libro', 'devocional', 'visitanos'];
    return [
      { source: '/', destination: '/es', permanent: false },
      ...paths.map((p) => ({
        source: `/${p}`,
        destination: `/es/${p}`,
        permanent: false,
      })),
    ];
  },
};

module.exports = withNextIntl(nextConfig);
