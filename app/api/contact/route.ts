import { NextResponse } from 'next/server';
import { contactSchema, escapeHtml, type ContactInput } from '@/lib/validation';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { site } from '@/lib/config';

// Node runtime: necesitamos APIs de servidor y control total del handler.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Respuestas SIEMPRE genéricas al cliente (Fort Knox #8): nunca exponer
// detalles internos de error.
const GENERIC_ERROR = { ok: false, error: 'error' as const };

export async function POST(request: Request) {
  try {
    // 1) Rate limiting por IP (Fort Knox #3)
    const ip = getClientIp(request.headers);
    const limit = rateLimit(ip);
    if (!limit.ok) {
      return NextResponse.json(
        { ok: false, error: 'rate_limited' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
      );
    }

    // 2) Cuerpo JSON acotado y bien formado
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(GENERIC_ERROR, { status: 415 });
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(GENERIC_ERROR, { status: 400 });
    }

    // 3) Validación + sanitización server-side (Fort Knox #2)
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      // No revelamos qué campo/regla falló más allá de lo necesario.
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 });
    }

    const data = parsed.data;

    // 4) Honeypot (Fort Knox #6): si el campo trampa trae algo, es bot.
    if (data.website && data.website.length > 0) {
      // Respondemos 200 "ok" para no dar pistas al bot, pero NO entregamos.
      return NextResponse.json({ ok: true });
    }

    // 5) Entrega (server-side). Best-effort; nunca filtra secretos ni errores.
    await deliver(data);

    return NextResponse.json({ ok: true });
  } catch {
    // Cualquier fallo inesperado → respuesta genérica, sin stack ni detalles.
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}

// Métodos no permitidos → 405 sin cuerpo informativo.
export async function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}

/**
 * Entrega del mensaje. Si hay proveedor de correo configurado por ENV
 * (solo server-side, sin NEXT_PUBLIC_), se envía; si no, se registra de
 * forma segura en el servidor. En ningún caso se exponen credenciales.
 */
async function deliver(data: ContactInput): Promise<void> {
  // El envío se activa con una sola variable server-only: CONTACT_EMAIL_ENABLED.
  const enabled = process.env.CONTACT_EMAIL_ENABLED === 'true';
  const to = process.env.CONTACT_TO_EMAIL || site.email; // blessinghousecchurch@gmail.com
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.EMAIL_API_KEY;

  // Contenido escapado (anti-XSS en el correo HTML).
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: data.phone ? escapeHtml(data.phone) : '',
    message: escapeHtml(data.message).replace(/\n/g, '<br/>'),
  };

  // Camino de envío cableado. Requiere: CONTACT_EMAIL_ENABLED=true +
  // credencial server-only (EMAIL_API_KEY) + remitente verificado (CONTACT_FROM_EMAIL).
  if (enabled && apiKey && from) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: data.email,
          subject: `Nuevo mensaje de contacto — ${safe.name}`,
          html: `<h2>Nuevo mensaje desde el sitio de ${site.name}</h2>
<p><strong>Nombre:</strong> ${safe.name}</p>
<p><strong>Correo:</strong> ${safe.email}</p>
${safe.phone ? `<p><strong>Teléfono:</strong> ${safe.phone}</p>` : ''}
<p><strong>Mensaje:</strong></p>
<p>${safe.message}</p>`,
        }),
      });
    } catch {
      // Silencioso: no exponemos el fallo del proveedor al cliente.
    }
    return;
  }

  // Sin proveedor activo: registro mínimo y seguro (sin PII ni credenciales).
  // Útil para el preview de Vercel hasta que se configuren las variables.
  if (process.env.NODE_ENV !== 'production') {
    console.info('[contact] mensaje válido recibido (envío de correo deshabilitado).');
  }
}
