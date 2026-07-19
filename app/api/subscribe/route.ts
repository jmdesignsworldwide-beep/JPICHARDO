import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminClient } from '@/lib/supabase/admin';
import { rateLimitGeneric, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GENERIC = { ok: false as const, error: 'error' as const };

const schema = z.object({
  email: z
    .string({ required_error: 'email' })
    .transform((v) => v.trim().toLowerCase())
    .pipe(z.string().email('email').max(160, 'email')),
  locale: z.enum(['es', 'en']).optional(),
  source: z.string().max(40).optional(),
  // Honeypot anti-bot.
  website: z.string().max(0).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    const limit = rateLimitGeneric(`subscribe:${ip}`, 5, 600_000);
    if (!limit.ok) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    }

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(GENERIC, { status: 415 });
    }
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 4_000) return NextResponse.json(GENERIC, { status: 413 });

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(GENERIC, { status: 400 });
    }
    const parsed = schema.safeParse(raw);
    if (!parsed.success) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 });

    const data = parsed.data;
    if (data.website && data.website.length > 0) return NextResponse.json({ ok: true }); // bot

    const admin = getAdminClient();
    // Sin Supabase: respondemos ok (no romper la UX) pero no persistimos.
    if (!admin) return NextResponse.json({ ok: true });

    // upsert por email para evitar duplicados sin revelar si ya existía.
    await admin
      .from('subscribers')
      .upsert(
        { email: data.email, locale: data.locale ?? null, source: data.source ?? null },
        { onConflict: 'email', ignoreDuplicates: true },
      );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(GENERIC, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}
