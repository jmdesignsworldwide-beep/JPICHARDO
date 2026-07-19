import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminClient } from '@/lib/supabase/admin';
import { geoFromHeaders } from '@/lib/geo';
import { rateLimitGeneric, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Respuesta neutra: la captura es fire-and-forget; nunca filtra estado interno.
const OK = new NextResponse(null, { status: 204 });

const schema = z.object({
  type: z.enum(['page', 'amazon', 'devotional']),
  path: z.string().max(300).optional(),
  locale: z.enum(['es', 'en']).optional(),
  bookSlug: z.string().max(80).optional(),
  target: z.enum(['instagram', 'tiktok', 'linktree', 'devotional']).optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limit por IP (la IP se usa SOLO en memoria; nunca se guarda).
    const ip = getClientIp(request.headers);
    if (!rateLimitGeneric(`track:${ip}`, 120, 60_000).ok) {
      return new NextResponse(null, { status: 429 });
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 2_000) return OK;

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return OK;
    }
    const parsed = schema.safeParse(raw);
    if (!parsed.success) return OK;
    const data = parsed.data;

    // Sin Supabase configurado → no-op seguro (el sitio funciona igual).
    const admin = getAdminClient();
    if (!admin) return OK;

    // Ubicación aproximada (sin IP).
    const geo = geoFromHeaders(request.headers);
    const loc = { country: geo.country, region: geo.region, city: geo.city };

    if (data.type === 'page' && data.path) {
      // No registrar el portal ni las rutas de API.
      if (data.path.startsWith('/portal') || data.path.startsWith('/api')) return OK;
      await admin.from('page_views').insert({ path: data.path, locale: data.locale ?? null, ...loc });
    } else if (data.type === 'amazon' && data.bookSlug) {
      await admin.from('amazon_clicks').insert({ book_slug: data.bookSlug, ...loc });
    } else if (data.type === 'devotional' && data.target) {
      await admin.from('devotional_clicks').insert({ target: data.target, ...loc });
    }

    return OK;
  } catch {
    return OK;
  }
}

export async function GET() {
  return new NextResponse(null, { status: 405 });
}
