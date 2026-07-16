import { useTranslations } from 'next-intl';
import { PencilLine } from 'lucide-react';

/**
 * Marca de contenido en BORRADOR pendiente de aprobación del pastor.
 * Identificable pero elegante. En el código, además, cada bloque lleva
 * el comentario {/* BORRADOR - pendiente aprobación pastor *​/}.
 */
export function DraftBadge({ className = '' }: { className?: string }) {
  const t = useTranslations('common');
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 font-label text-[0.6rem] font-semibold uppercase tracking-wide2 text-gold-400 ${className}`}
      title={t('draftNotice')}
    >
      <PencilLine className="h-3 w-3" />
      {t('draftNotice')}
    </span>
  );
}
