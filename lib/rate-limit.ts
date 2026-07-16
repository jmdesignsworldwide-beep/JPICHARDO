/**
 * Rate limiting server-side por IP (Fort Knox #3).
 *
 * Implementación de ventana deslizante en memoria. Suficiente para un
 * formulario de contacto informativo en una sola instancia. Para escala
 * multi-instancia, conecta Upstash Redis con las variables de entorno
 * (ver .env.example) — la interfaz es la misma.
 */

type Hit = { count: number; resetAt: number };

// Nota: en serverless el estado en memoria es por instancia y efímero.
// Es una barrera anti-abuso, no un almacén de verdad.
const store = new Map<string, Hit>();

const WINDOW_MS = 600_000; // 10 minutos
const MAX_REQUESTS = 5; // 5 mensajes por IP cada 10 minutos

// Limpieza oportunista para evitar crecimiento no acotado del Map.
function sweep(now: number) {
  if (store.size < 5000) return;
  for (const [key, hit] of store) {
    if (hit.resetAt <= now) store.delete(key);
  }
}

export function rateLimit(ip: string): {
  ok: boolean;
  remaining: number;
  retryAfter: number;
} {
  const now = Date.now();
  sweep(now);

  const existing = store.get(ip);

  if (!existing || existing.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1, retryAfter: 0 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: MAX_REQUESTS - existing.count,
    retryAfter: 0,
  };
}

/** Extrae la IP del cliente de forma robusta detrás de proxies (Vercel). */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip')?.trim() || 'unknown';
}
