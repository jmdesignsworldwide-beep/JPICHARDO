'use client';

/**
 * Envío de eventos de analítica al endpoint propio (/api/track), same-origin
 * (la CSP `connect-src 'self'` lo permite). Fire-and-forget: usa sendBeacon
 * cuando está disponible para no bloquear la navegación. Sin datos personales.
 */
export type TrackPayload =
  | { type: 'page'; path: string; locale?: 'es' | 'en' }
  | { type: 'amazon'; bookSlug: string }
  | { type: 'devotional'; target: 'instagram' | 'tiktok' | 'linktree' | 'devotional' };

export function track(payload: TrackPayload): void {
  try {
    const body = JSON.stringify(payload);
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
      return;
    }
    void fetch('/api/track', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
    });
  } catch {
    /* la analítica nunca debe afectar la experiencia */
  }
}
