# Blessing House · JPichardo Ministries

Sitio informativo premium multi-página para la iglesia **Blessing House**
(Freeport, NY), con el libro _Comenzando Mi Viaje_ del Pastor José Pichardo
como protagonista del inicio.

## Stack

- **Next.js 14** (App Router, Server Components) + **TypeScript** estricto
- **Tailwind CSS** con design tokens (dorado · negro · azul)
- **next-intl** — i18n real ES/EN (ES por defecto, toggle persistente)
- **framer-motion** — animaciones al scroll, parallax sutil, flotación
- **lucide-react** — iconografía
- **Zod** — validación server-side del formulario
- Fuentes con `next/font`: Playfair Display, Cormorant Garamond, Inter, Sora

## Estructura

```
app/[locale]/            Páginas: /, /nosotros, /pastor, /libro, /devocional, /visitanos
app/api/contact/         API Route del formulario (Fort Knox)
components/brand/         Marca in-line (Logo, portada del libro, retrato) en SVG
components/layout/        Header, Footer, LocaleSwitcher
components/ui/            Button, Card, Section, Reveal, GoldDivider, …
components/sections/      Heros, teasers, pilares, capítulos, formulario
i18n/                     routing, request, navigation (next-intl)
lib/                      config (datos verídicos), validation, rate-limit, seo, fonts
messages/                es.json · en.json (todo el texto)
```

## Scripts

```bash
npm install
npm run build       # compila producción (verificación de código)
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm audit           # dependencias sin vulnerabilidades
```

> El equipo verifica el resultado visual en **Vercel preview**, no en local.

## Contenido editable clave

- **Disponibilidad del libro:** `lib/config.ts` → `BOOK_AVAILABLE` + `BOOK_URL`.
  Con `false`, el botón muestra "Próximamente en Amazon" (premium, no roto).
  Con `true` + URL, el botón de compra se activa automáticamente.
- **Datos verídicos** (dirección, teléfono, email, redes, horarios): `lib/config.ts`.
- **Textos y traducciones:** `messages/es.json` y `messages/en.json`.
- **Contenido en revisión pastoral** (`[BORRADOR]`): misión, visión, valores y
  las "tres funciones" en `/nosotros`. Marcados en pantalla con un distintivo y
  en el código con el comentario `{/* BORRADOR - pendiente aprobación pastor */}`.

## Assets

Los componentes de marca se renderizan como **SVG in-line** (nítidos, sin
peticiones externas, sin riesgo de CSP), sirviendo de placeholder premium.
Cuando lleguen los binarios reales:

- `public/logo-jpichardo.png` — logo JPichardo Ministries
- `public/libro-comenzando-mi-viaje.webp` — portada del libro
- `public/pastor-jose-pichardo.jpg` — foto del pastor en alta

…colócalos en `/public` y ajusta `lib/config.ts` (`assets`) para usarlos.

## Seguridad

Ver [`SECURITY.md`](./SECURITY.md). Fort Knox aplicado desde la línea 1:
validación Zod server-side, rate limiting por IP, honeypot, headers de
seguridad (CSP/HSTS/etc.) y cero secretos en el repo.

---

Sitio por JM Designs Worldwide.
