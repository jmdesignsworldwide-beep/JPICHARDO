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
- Se eliminan caracteres de control y se recorta/normaliza cada input.
- La salida se escapa (`escapeHtml`) antes de construir el correo — anti-XSS.

## 3. Rate limiting por IP

- `lib/rate-limit.ts`: ventana deslizante de **5 solicitudes por IP por minuto**
  en `/api/contact`. Responde `429` con `Retry-After`.
- Para escala multi-instancia, conectar Upstash Redis (variables en
  `.env.example`); la interfaz no cambia.

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

- Ejecutar `npm audit` y mantenerlo en cero antes de cada release.

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
