import type { DayItem } from '@/lib/portal/analytics';

/** Gráfico de barras de visitas por día (SVG ligero, sin dependencias). */
export function VisitsChart({ data }: { data: DayItem[] }) {
  if (data.length === 0) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="font-label text-[0.7rem] uppercase tracking-label text-gold-400">Visitas en el tiempo</h3>
        <p className="mt-4 text-sm text-cream-50/50">Sin datos todavía.</p>
      </div>
    );
  }
  const max = Math.max(...data.map((d) => d.count), 1);
  const days = data.slice(-60);

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-label text-[0.7rem] uppercase tracking-label text-gold-400">Visitas en el tiempo</h3>
      <div className="mt-5 flex h-40 items-end gap-[2px]">
        {days.map((d) => (
          <div key={d.date} className="group relative flex-1" title={`${d.date}: ${d.count}`}>
            <div
              className="w-full rounded-t bg-hero-gold/80 transition-colors group-hover:bg-hero-gold"
              style={{ height: `${Math.max(2, (d.count / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.65rem] text-cream-50/45">
        <span>{days[0]?.date}</span>
        <span>{days[days.length - 1]?.date}</span>
      </div>
    </div>
  );
}
