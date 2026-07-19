-- ─────────────────────────────────────────────────────────────
-- Portal de analíticas · Blessing House / JPichardo Ministries
-- Fort Knox + privacidad:
--   • NUNCA se guarda IP ni datos personales identificables.
--   • Solo ubicación aproximada agregada (país/región/ciudad) de los
--     geo-headers de Vercel.
--   • RLS + FORCE en todas las tablas: anon/authenticated NO pueden leer ni
--     escribir. Toda escritura/lectura pasa por el servidor con service_role
--     (que salta RLS) tras validar sesión/entrada.
--   • Los correos solo se guardan cuando la persona los deja voluntariamente.
--
-- Ejecutar en el SQL Editor de Supabase (una sola vez). Idempotente.
-- ─────────────────────────────────────────────────────────────

-- Visitas a páginas públicas (sin IP)
create table if not exists public.page_views (
  id          bigint generated always as identity primary key,
  path        text not null,
  locale      text,
  country     text,   -- ISO-3166-1 alpha-2 (ej. "US", "DO")
  region      text,   -- código de región/estado (ej. "NY")
  city        text,   -- ciudad aproximada
  created_at  timestamptz not null default now()
);

-- Clics al botón de Amazon por libro
create table if not exists public.amazon_clicks (
  id          bigint generated always as identity primary key,
  book_slug   text not null,
  country     text,
  region      text,
  city        text,
  created_at  timestamptz not null default now()
);

-- Clics a enlaces del devocional (instagram | tiktok | linktree | devotional)
create table if not exists public.devotional_clicks (
  id          bigint generated always as identity primary key,
  target      text not null,
  country     text,
  region      text,
  city        text,
  created_at  timestamptz not null default now()
);

-- Correos dejados voluntariamente (newsletter / "avísame")
create table if not exists public.subscribers (
  id          bigint generated always as identity primary key,
  email       text not null unique,
  locale      text,
  source      text,
  created_at  timestamptz not null default now()
);

-- Índices para consultas del dashboard
create index if not exists page_views_created_at_idx     on public.page_views (created_at desc);
create index if not exists page_views_country_idx        on public.page_views (country);
create index if not exists amazon_clicks_created_at_idx  on public.amazon_clicks (created_at desc);
create index if not exists devotional_clicks_created_at_idx on public.devotional_clicks (created_at desc);
create index if not exists subscribers_created_at_idx    on public.subscribers (created_at desc);

-- ── RLS + FORCE en TODAS las tablas ──────────────────────────
-- Sin políticas => anon y authenticated quedan totalmente bloqueados.
-- service_role (server-only) salta RLS para insertar/leer desde el servidor.
alter table public.page_views       enable row level security;
alter table public.page_views       force  row level security;
alter table public.amazon_clicks    enable row level security;
alter table public.amazon_clicks    force  row level security;
alter table public.devotional_clicks enable row level security;
alter table public.devotional_clicks force  row level security;
alter table public.subscribers      enable row level security;
alter table public.subscribers      force  row level security;

-- Revoca cualquier acceso directo de los roles públicos (defensa en profundidad).
revoke all on public.page_views       from anon, authenticated;
revoke all on public.amazon_clicks    from anon, authenticated;
revoke all on public.devotional_clicks from anon, authenticated;
revoke all on public.subscribers      from anon, authenticated;
