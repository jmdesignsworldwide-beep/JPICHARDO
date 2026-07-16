# Blessing House · JPichardo Ministries

Sitio informativo premium multi-página para la iglesia **Blessing House**
(Freeport, NY), con el libro _Comenzando Mi Viaje_ del Pastor José Pichardo
como protagonista del inicio.

## Stack

- **Next.js 16** (App Router, Server Components) + **TypeScript** estricto
  — el brief pedía Next 14; se subió a 16 (con next-intl 4) para dejar
  `npm audit` en cero, cumpliendo Fort Knox y el criterio de aceptación.
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

- **Disponibilidad del libro:** `lib/book.ts` → `BOOK_AVAILABLE` + `BOOK_AMAZON_URL`.
  Con `false`, el botón muestra "Próximamente en Amazon" (premium, no roto).
  Con `true` + URL, el botón pasa a "Comprar en Amazon" automáticamente.
- **Datos verídicos** (dirección, teléfono, email, redes, horarios): `lib/config.ts`.
- **Textos y traducciones:** `messages/es.json` y `messages/en.json`.

## Variables de entorno (producción)

Copia `.env.example` a `.env.local` (nunca lo subas). Todas son **server-only**:

| Variable | Para qué |
|---|---|
| `CONTACT_EMAIL_ENABLED` | `true` activa el envío del formulario por correo. |
| `EMAIL_API_KEY` | Clave del proveedor (Resend). |
| `CONTACT_FROM_EMAIL` | Remitente verificado. |
| `CONTACT_TO_EMAIL` | Destino (por defecto `blessinghousecchurch@gmail.com`). |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | (Opcional) rate limit distribuido. |

Sin estas variables el formulario valida y responde correctamente, pero no
envía correo (registro seguro sin PII). El rate limit cae al limitador en
memoria por instancia.

## Contenido de la iglesia

Misión, Visión, Valores, las tres funciones (Adoración · Edificación ·
Evangelización) y los textos de bienvenida usan una redacción **general y
profesional** (evangélica, no denominacional), lista para publicar. El pastor
puede afinarla en cualquier momento editando `messages/es.json` / `en.json`.

## Assets

Imágenes reales integradas (en `/public`):

- `logo-jpichardo.png` — **logo real** de JPichardo Ministries. En uso en la
  página del Pastor, en los iconos/OpenGraph y en el manifest. El emblema
  pequeño de Header/Footer usa el SVG in-line (nítido a tamaño reducido).
- `libro-en-estante.png` — foto editorial del libro (showcase en Inicio).
- `devocional-biblia-diario.png` — Biblia + diario (showcase en El Libro).
- `libro-amazon-banner.png` y `libro-amazon-portada.png` — piezas de marketing
  que dicen **"Disponible en Amazon"**. Se dejan **en reserva**: cuando el libro
  esté publicado (`BOOK_AVAILABLE=true` + URL en `lib/book.ts`) son ideales como
  banner/hero de Amazon. No se muestran ahora para no contradecir el estado
  "Próximamente".

Placeholders en SVG in-line que aún pueden reemplazarse por binarios reales:

- **Portada del libro** (mockup 3D del hero) — `components/brand/BookCover.tsx`.
- **Foto del pastor** — `components/brand/PastorPortrait.tsx`
  (se puede sustituir por `public/pastor-jose-pichardo.jpg` en alta).

## Seguridad

Ver [`SECURITY.md`](./SECURITY.md). Fort Knox aplicado desde la línea 1:
validación Zod server-side, rate limiting por IP, honeypot, headers de
seguridad (CSP/HSTS/etc.) y cero secretos en el repo.

---

Sitio por JM Designs Worldwide.
