import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Logo } from '@/components/brand/Logo';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-32 text-center">
      <div className="max-w-md">
        <Logo size={64} className="mx-auto" />
        <p className="mt-8 font-display text-7xl text-foil">404</p>
        <GoldDivider className="my-6" />
        <h1 className="font-display text-2xl">{t('title')}</h1>
        <p className="mt-3 text-cream-50/70">{t('body')}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-hero-gold px-6 py-3 font-label text-xs font-semibold uppercase tracking-wide2 text-navy-900 shadow-gold transition-transform hover:-translate-y-0.5"
        >
          {t('home')}
        </Link>
      </div>
    </section>
  );
}
