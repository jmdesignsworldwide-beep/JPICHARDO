import type { CountItem, CityItem } from '@/lib/portal/analytics';

function Bar({ pct }: { pct: number }) {
  return (
    <span className="ml-3 hidden h-1.5 flex-1 overflow-hidden rounded-full bg-gold-500/10 sm:block">
      <span className="block h-full rounded-full bg-hero-gold" style={{ width: `${Math.max(4, pct)}%` }} />
    </span>
  );
}

export function Ranking({
  title,
  items,
  empty = 'Sin datos todavía.',
}: {
  title: string;
  items: CountItem[];
  empty?: string;
}) {
  const max = items[0]?.count ?? 1;
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-label text-[0.7rem] uppercase tracking-label text-gold-400">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-cream-50/50">{empty}</p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {items.map((it) => (
            <li key={it.key} className="flex items-center text-sm">
              <span className="min-w-0 truncate text-cream-50/85">{it.label}</span>
              <Bar pct={(it.count / max) * 100} />
              <span className="ml-3 shrink-0 font-display font-semibold text-foil">{it.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CityRanking({ title, items }: { title: string; items: CityItem[] }) {
  const max = items[0]?.count ?? 1;
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-label text-[0.7rem] uppercase tracking-label text-gold-400">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-cream-50/50">Sin datos todavía.</p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {items.map((it, i) => (
            <li key={`${it.city}-${i}`} className="flex items-center text-sm">
              <span className="min-w-0 truncate text-cream-50/85">
                {it.city}
                {it.region ? <span className="text-cream-50/45">, {it.region}</span> : null}
                {it.country ? <span className="text-cream-50/35"> · {it.country}</span> : null}
              </span>
              <span className="ml-3 hidden h-1.5 flex-1 overflow-hidden rounded-full bg-gold-500/10 sm:block">
                <span className="block h-full rounded-full bg-hero-gold" style={{ width: `${Math.max(4, (it.count / max) * 100)}%` }} />
              </span>
              <span className="ml-3 shrink-0 font-display font-semibold text-foil">{it.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
