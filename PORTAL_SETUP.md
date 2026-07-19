# Portal de analíticas — Guía de configuración (Marien)

El código del portal ya está en el sitio. Para **activarlo** hay que crear un
proyecto de Supabase, correr una migración SQL, poner 4 variables de entorno en
Vercel y crear el usuario del pastor. **El sitio funciona sin esto**; el portal
y la captura de datos solo se encienden cuando las variables están presentes.

> Nada de esto se puede hacer desde el repositorio: requiere tu cuenta de
> Supabase. Sigue estos pasos una sola vez.

## 1. Crear proyecto Supabase
1. Entra a https://supabase.com → **New project**.
2. Guarda de **Project Settings → API**:
   - `Project URL`
   - `anon public` key
   - `service_role` key ⚠️ (secreta — trátala como una contraseña maestra).

## 2. Crear las tablas (SQL)
En **SQL Editor**, pega y ejecuta el contenido de
`supabase/migrations/0001_analytics.sql` (en este repo). Crea las 4 tablas con
**RLS + FORCE** activados y sin políticas públicas (solo el servidor con
`service_role` puede leer/escribir).

## 3. Crear el usuario del pastor (Auth)
En **Authentication → Users → Add user → Create new user**:
- Email: elige uno para el admin (ej. `pichardo@blessinghouse.co`).
- Password: una **contraseña temporal** (el pastor la cambia luego desde el
  portal). Marca *Auto Confirm User*.

> El pastor entrará con **usuario `Pichardo`** (no el correo). El código mapea
> ese usuario al correo admin que configures en el paso 4.

## 4. Variables de entorno en Vercel
En **Vercel → Project → Settings → Environment Variables** (Production y
Preview), añade:

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (**server-only**) |
| `PORTAL_ADMIN_EMAIL` | el correo del usuario del paso 3 |

⚠️ Nunca pongas la `service_role` con prefijo `NEXT_PUBLIC_`, ni la compartas
por chat/correo. Redespliega después de añadirlas.

## 5. Correr el Security Advisor
En **Supabase → Advisors → Security Advisor**, ejecútalo y confirma que no haya
warnings (las tablas deben salir con RLS habilitado). Si aparece algo, avísame.

## 6. Cambiar la contraseña
El pastor entra a `/portal` con usuario `Pichardo` + la contraseña temporal, y
desde el propio portal (tarjeta **"Cambiar contraseña"**) la actualiza.

---

## Cómo funciona (resumen)
- **Acceso:** enlace discreto (un `·`) al final del footer, o directo en `/portal`.
- **Privacidad:** la ubicación (país/región/ciudad aproximada) se deriva de los
  geo-headers de Vercel. **Nunca se guarda la IP** ni datos personales. Los
  correos son solo los que las personas dejan voluntariamente.
- **Seguridad:** RLS + FORCE en todas las tablas; `service_role` solo en el
  servidor; la captura y el dashboard corren server-side; el navegador nunca
  habla con Supabase (la CSP `connect-src 'self'` se mantiene intacta); el
  portal es `noindex` y no está en la navegación ni en el sitemap.
- **Qué se captura:** visitas a páginas públicas, clics al Amazon por libro,
  clics a los enlaces del devocional (Instagram/TikTok/Linktree) y correos del
  formulario "Avísame".
