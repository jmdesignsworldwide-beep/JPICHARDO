import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Eye, Globe2, MapPin, ShoppingCart, Mail, Sparkles } from 'lucide-react';
import { getPortalUser } from '@/lib/portal/auth';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { getAnalytics, type Range } from '@/lib/portal/analytics';
import { StatCard } from '@/components/portal/StatCard';
import { Ranking, CityRanking } from '@/components/portal/Ranking';
import { GeoMaps } from '@/components/portal/GeoMaps';
import { VisitsChart } from '@/components/portal/VisitsChart';
import { SubscribersTable } from '@/components/portal/SubscribersTable';
import { DateRangeFilter } from '@/components/portal/DateRangeFilter';
import { ChangePassword } from '@/components/portal/ChangePassword';
import { LogoutButton } from '@/components/portal/LogoutButton';

export const dynamic = 'force-dynamic';

const BOOK_TITLES: Record<string, string> = {
  'comenzando-mi-viaje': 'Comenzando Mi Viaje',
  'relaciones-interpersonales': 'Relaciones Interpersonales',
};
const DEVOTIONAL_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linktree: 'Linktree',
  devotional: 'Ver devocional',
};

export default async function PortalDashboard({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  // Puerta de seguridad: sin sesión válida → login. (Sin middleware.)
  if (!isSupabaseConfigured()) redirect('/portal/login');
  const user = await getPortalUser();
  if (!user) redirect('/portal/login');

  const { range: rangeParam } = await searchParams;
  const range: Range = rangeParam === '7' || rangeParam === 'all' ? rangeParam : '30';
  const a = await getAnalytics(range);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Cabecera */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="block w-11 overflow-hidden rounded-xl ring-1 ring-gold-500/20">
            <Image src="/logo-jpichardo-header.png" alt="JPichardo Ministries" width={48} height={48} className="h-auto w-full" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tightish text-foil-shimmer">Portal de analíticas</h1>
            <p className="text-xs text-cream-50/55">Blessing House · JPichardo Ministries</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DateRangeFilter />
          <LogoutButton />
        </div>
      </header>

      {/* Tarjetas de stats */}
      <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard icon={Eye} label="Visitas" value={a.totals.visits} />
        <StatCard icon={Globe2} label="Países" value={a.totals.countries} hint={a.topCountry ? `Top: ${a.topCountry.label}` : undefined} />
        <StatCard icon={MapPin} label="Top estado (EE. UU.)" value={a.topRegion?.count ?? 0} hint={a.topRegion?.label} />
        <StatCard icon={ShoppingCart} label="Clics a Amazon" value={a.totals.amazon} />
        <StatCard icon={Sparkles} label="Clics devocional" value={a.totals.devotional} />
        <StatCard icon={Mail} label="Correos" value={a.totals.subscribers} />
      </section>

      {/* Mapas */}
      <section className="mt-6">
        <GeoMaps world={a.byCountry} us={a.byRegion} />
      </section>

      {/* Rankings */}
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <Ranking title="Países" items={a.byCountry} />
        <Ranking title="Estados (EE. UU.)" items={a.byRegion} />
        <CityRanking title="Ciudades" items={a.byCity} />
      </section>

      {/* Clics + páginas */}
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <Ranking
          title="Clics a Amazon por libro"
          items={a.amazonByBook.map((i) => ({ ...i, label: BOOK_TITLES[i.key] ?? i.key }))}
        />
        <Ranking
          title="Clics al devocional"
          items={a.devotionalByTarget.map((i) => ({ ...i, label: DEVOTIONAL_LABELS[i.key] ?? i.key }))}
        />
        <Ranking title="Páginas más vistas" items={a.byPath} />
      </section>

      {/* Gráfico de visitas */}
      <section className="mt-6">
        <VisitsChart data={a.visitsByDay} />
      </section>

      {/* Correos + cuenta */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <SubscribersTable subscribers={a.subscribers} />
        <ChangePassword />
      </section>

      <p className="mt-8 text-center text-[0.65rem] text-cream-50/35">
        Privacidad: se registra ubicación aproximada (país/región/ciudad), nunca la IP ni datos personales.
        Los correos son solo los que las personas dejan voluntariamente.
      </p>
    </main>
  );
}
