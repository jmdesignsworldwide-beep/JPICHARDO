import { z } from 'zod';

/**
 * Validación y sanitización server-side (Fort Knox #2).
 * NUNCA confiar en la validación de UI. Todo input se valida aquí.
 */

// Quita caracteres de control y normaliza espacios (anti-inyección de payloads).
// Conserva \t (\x09), \n (\x0A) y \r (\x0D); elimina el resto del rango de control.
function clean(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'name' })
    .transform(clean)
    .pipe(z.string().min(2, 'name').max(80, 'name')),
  email: z
    .string({ required_error: 'email' })
    .transform((v) => clean(v).toLowerCase())
    .pipe(z.string().email('email').max(160, 'email')),
  message: z
    .string({ required_error: 'message' })
    .transform(clean)
    .pipe(z.string().min(10, 'message').max(2000, 'message')),
  // Honeypot (Fort Knox #6): campo trampa oculto. Debe llegar vacío.
  website: z.string().max(0, 'bot').optional().or(z.literal('')),
  // Marca de tiempo de render: permite rechazar envíos sub-humanos si viene.
  ts: z.coerce.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Escapa HTML para cualquier salida (correo/almacenamiento) — anti-XSS (Fort Knox #4).
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
