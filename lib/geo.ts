import 'server-only';

/**
 * Ubicación aproximada derivada de los geo-headers que Vercel añade
 * automáticamente. PRIVACIDAD: nunca leemos ni guardamos la IP — solo país,
 * región y ciudad aproximada (datos agregados, no identificables).
 */
export type Geo = {
  country: string | null;
  region: string | null;
  city: string | null;
};

function clean(v: string | null): string | null {
  if (!v) return null;
  // Los headers de ciudad vienen URL-encoded (ej. "New%20York").
  let out = v;
  try {
    out = decodeURIComponent(v);
  } catch {
    /* deja el valor tal cual si no es decodificable */
  }
  out = out.trim().slice(0, 120);
  return out.length ? out : null;
}

export function geoFromHeaders(headers: Headers): Geo {
  return {
    country: clean(headers.get('x-vercel-ip-country')),
    region: clean(headers.get('x-vercel-ip-country-region')),
    city: clean(headers.get('x-vercel-ip-city')),
  };
}
