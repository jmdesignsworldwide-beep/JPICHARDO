# Seguridad — Blessing House (Fort Knox)

Aunque es un sitio informativo, el formulario de contacto es superficie de
ataque. La seguridad se aplicó **desde el primer archivo**, no como una tanda
final. Este documento resume las medidas activas.

## 1. Cero claves expuestas

- Ninguna credencial usa el prefijo `NEXT_PUBLIC_`. Todo secreto se lee
  **solo server-side** en `app/api/contact/route.ts`.
- `.env`, `.env.local` y variantes están en `.gitignore`. En el repo solo vive
  `.env.example` (sin valores reales).
- `next.config.js` elimina `console.*` en producción (excepto `error`) para
  evitar fugas accidentales en logs de cliente.

## 2. Validación y sanitización server-side (Zod)

- `lib/validation.ts` define el esquema con **Zod**. El servidor es la única
  autoridad; la validación de UI es solo para UX.
- Campos: nombre (2–80), email (formato, ≤160), **teléfono opcional** (regex
  laxo, ≤40) y mensaje (10–1000).
- Se eliminan caracteres de control y se recorta/normaliza cada input.
- Solo se acepta `Content-Type: application/json`; el cuerpo se valida y se
  rechaza lo mal formado con estados genéricos (400/415/422).
- La salida se escapa (`escapeHtml`) antes de construir el correo — anti-XSS.

## 3. Rate limiting por IP

- `lib/rate-limit.ts`: ventana deslizante de **5 solicitudes por IP cada 10
  minutos** en `/api/contact`. Responde `429` con `Retry-After`.
- IP obtenida de `x-forwarded-for` (primer valor, puesto por el proxy de
  Vercel) con fallback a `x-real-ip`.
- Fallback en memoria (por instancia, apto para volumen bajo). Para escala
  multi-instancia, conectar Upstash Redis (variables en `.env.example`); la
  interfaz no cambia.

## 3.b Envío del correo — activable por una sola variable

- El envío a `blessinghousecchurch@gmail.com` está **cableado** detrás de
  `CONTACT_EMAIL_ENABLED`. Solo se envía si es `true` **y** existen
  `EMAIL_API_KEY` + `CONTACT_FROM_EMAIL` (todas server-only).
- Sin proveedor activo, el mensaje se valida y se registra de forma segura
  (sin PII ni credenciales). No hay que tocar código para activarlo.

## 4. Protección anti-inyección

- Sin `dangerouslySetInnerHTML` con input de usuario en toda la app.
- Toda salida derivada de input se escapa antes de renderizar/enviar.

## 5. Security headers

Definidos en `next.config.js` (`headers()`), aplicados a todas las rutas:

- `Content-Security-Policy` endurecida (frame-src limitado a Google Maps).
- `Strict-Transport-Security` (HSTS, 2 años, preload).
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (cámara/micrófono/geolocalización deshabilitados).

## 6. Anti-bot

- **Honeypot**: campo `website` oculto para humanos. Si llega con contenido, el
  endpoint responde `200 ok` sin entregar (no da pistas al bot).
- Marca de tiempo de render (`ts`) disponible para descartar envíos no humanos.

## 7. Dependencias

- `npm audit`: **0 vulnerabilidades**. Para lograrlo se subió el stack a
  Next 16 + next-intl 4 (la línea Next 14 arrastraba 6 vulns sin parche) y se
  forzó `postcss ^8.5.19` vía `overrides`. Mantener en cero antes de cada release.

## 8. Errores genéricos

- `/api/contact` nunca expone stack traces ni detalles internos. Respuestas:
  `ok`, `invalid`, `rate_limited`, `error` con códigos HTTP adecuados.

## 9. Cierre de release

Checklist antes de publicar:

- [ ] `npm run build` sin errores.
- [ ] `npm run lint` limpio.
- [ ] `npm run typecheck` limpio.
- [ ] `npm audit` en cero.
- [ ] Headers verificables en el preview de Vercel.
- [ ] Ningún secreto en el repo ni en el bundle de cliente.

## Reporte de vulnerabilidades

Escribir a: blessinghousecchurch@gmail.com
