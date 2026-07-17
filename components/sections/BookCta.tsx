import { useTranslations } from 'next-intl';
import { ShoppingCart, BellRing, Sparkles } from 'lucide-react';
import { BOOK_AVAILABLE, BOOK_AMAZON_URL } from '@/lib/book';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';

/**
 * CTA de compra del libro. Controlado por UNA sola variable (BOOK_AVAILABLE).
 * - false → botón "Próximamente en Amazon" en estado espera PREMIUM (no roto,
 *   no gris feo) + microenlace "Notifícame" hacia el contacto.
 * - true + BOOK_AMAZON_URL → botón activo "Comprar en Amazon".
 */
export function BookCta({ align = 'center' }: { align?: 'center' | 'start' }) {
  const t = useTranslations('common');
  const tb = useTranslations('book.cta');

  const wrap =
    align === 'center'
      ? 'flex flex-col items-center text-center'
      : 'flex flex-col items-start text-left';

  if (BOOK_AVAILABLE && BOOK_AMAZON_URL) {
    return (
      <div className={wrap}>
        <ButtonAnchor href={BOOK_AMAZON_URL} size="lg">
          <ShoppingCart className="h-4 w-4" />
          {t('buyOnAmazon')}
        </ButtonAnchor>
        <p className="mt-3 text-sm text-cream-50/60">{tb('available')}</p>
      </div>
    );
  }

  // Estado "Próximamente" — pastilla premium sobria: borde dorado, fondo sutil
  // y un glow MUY suave y lento. Sin líneas cruzando ni beam giratorio.
  return (
    <div className={wrap}>
      <div
        className="relative inline-flex cursor-default items-center gap-2.5 rounded-full border border-gold-500/50 bg-gold-500/[0.06] px-8 py-4 font-label text-xs font-semibold uppercase tracking-wide2 text-gold-200 shadow-[0_0_28px_-8px_rgba(201,162,75,0.4)]"
        aria-disabled="true"
        role="button"
        title={t('comingSoonAmazon')}
      >
        {/* Glow dorado muy suave y lento (se detiene con prefers-reduced-motion) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold-500/15 blur-md"
          style={{ animation: 'soft-glow 5s ease-in-out infinite' }}
        />
        <Sparkles className="h-4 w-4 text-gold-400" />
        <span>{t('comingSoonAmazon')}</span>
      </div>

      {/* Microtexto "Notifícame" — enlaza al contacto */}
      <ButtonLink href="/visitanos" variant="ghost" size="md" className="mt-3">
        <BellRing className="h-3.5 w-3.5" />
        {t('comingSoonHint')}
      </ButtonLink>
    </div>
  );
}
