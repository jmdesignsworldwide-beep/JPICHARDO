import { useTranslations } from 'next-intl';
import { ShoppingCart, BellRing, Sparkles } from 'lucide-react';
import { BOOK_AVAILABLE, BOOK_URL } from '@/lib/config';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';

/**
 * CTA de compra del libro. Controlado por UNA sola variable (BOOK_AVAILABLE).
 * - false → botón "Próximamente en Amazon" en estado espera PREMIUM (no roto,
 *   no gris feo) + microenlace "Notifícame" hacia el contacto.
 * - true + BOOK_URL → botón activo "Comprar en Amazon".
 */
export function BookCta({ align = 'center' }: { align?: 'center' | 'start' }) {
  const t = useTranslations('common');
  const tb = useTranslations('book.cta');

  const wrap =
    align === 'center'
      ? 'flex flex-col items-center text-center'
      : 'flex flex-col items-start text-left';

  if (BOOK_AVAILABLE && BOOK_URL) {
    return (
      <div className={wrap}>
        <ButtonAnchor href={BOOK_URL} size="lg">
          <ShoppingCart className="h-4 w-4" />
          {t('buyOnAmazon')}
        </ButtonAnchor>
        <p className="mt-3 text-sm text-cream-50/60">{tb('available')}</p>
      </div>
    );
  }

  // Estado "Próximamente" — premium, dorado, con brillo sutil (no deshabilitado feo).
  return (
    <div className={wrap}>
      <div
        className="group relative inline-flex cursor-default items-center gap-2 overflow-hidden rounded-full border border-gold-500/60 bg-gradient-to-r from-gold-600/20 via-gold-500/10 to-gold-600/20 px-8 py-4 font-label text-xs font-semibold uppercase tracking-wide2 text-gold-300 shadow-gold"
        aria-disabled="true"
        role="button"
        title={t('comingSoonAmazon')}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full"
          style={{ transition: 'transform 1.1s ease' }}
        />
        <Sparkles className="h-4 w-4 text-gold-400" />
        <span className="text-gold-200">{t('comingSoonAmazon')}</span>
      </div>

      {/* Microtexto "Notifícame" — enlaza al contacto */}
      <ButtonLink href="/visitanos" variant="ghost" size="md" className="mt-3">
        <BellRing className="h-3.5 w-3.5" />
        {t('comingSoonHint')}
      </ButtonLink>
    </div>
  );
}
