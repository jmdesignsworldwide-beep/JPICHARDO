'use client';

import { useEffect, useMemo, useState } from 'react';
import { geoPath, geoEqualEarth } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { ISO2_TO_NUM } from '@/lib/geo-names';

type Datum = { key: string; label: string; count: number };

function goldFill(count: number, max: number): string {
  if (!count) return 'rgba(255,255,255,0.045)';
  const t = max > 0 ? count / max : 0;
  return `rgba(201,162,75,${(0.28 + 0.62 * t).toFixed(3)})`;
}

/** Mapa mundial (choropleth por país, coloreado por visitas). */
function WorldMap({ data }: { data: Datum[] }) {
  const [fc, setFc] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/geo/countries-110m.json')
      .then((r) => r.json())
      .then((topo) => {
        const obj = (topo as { objects: Record<string, unknown> }).objects.countries;
        const collection = feature(
          topo as Parameters<typeof feature>[0],
          obj as Parameters<typeof feature>[1],
        ) as unknown as FeatureCollection;
        if (alive) setFc(collection);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const { counts, max } = useMemo(() => {
    const m = new Map<string, number>();
    let mx = 0;
    for (const d of data) {
      const num = ISO2_TO_NUM[d.key.toUpperCase()];
      if (num) {
        m.set(num, (m.get(num) ?? 0) + d.count);
        mx = Math.max(mx, m.get(num)!);
      }
    }
    return { counts: m, max: mx };
  }, [data]);

  const W = 960;
  const H = 440;
  const path = useMemo(() => {
    if (!fc) return null;
    const projection = geoEqualEarth().fitSize([W, H], fc);
    return geoPath(projection);
  }, [fc]);

  if (!fc || !path) {
    return <div className="h-[280px] animate-pulse rounded-xl bg-navy-900/40" />;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Mapa de visitas por país">
      {fc.features.map((f: Feature<Geometry>, i) => {
        const id = String(f.id ?? '');
        const count = counts.get(id) ?? 0;
        const d = path(f) ?? undefined;
        const name = (f.properties as { name?: string } | null)?.name ?? '';
        return (
          <path
            key={i}
            d={d}
            fill={goldFill(count, max)}
            stroke="rgba(10,26,47,0.9)"
            strokeWidth={0.4}
          >
            {count > 0 && <title>{`${name}: ${count}`}</title>}
          </path>
        );
      })}
    </svg>
  );
}

/** Mapa de estados de EE. UU. (geometría Albers pre-proyectada). */
function USMap({ data }: { data: Datum[] }) {
  const [fc, setFc] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/geo/states-albers-10m.json')
      .then((r) => r.json())
      .then((topo) => {
        const obj = (topo as { objects: Record<string, unknown> }).objects.states;
        const collection = feature(
          topo as Parameters<typeof feature>[0],
          obj as Parameters<typeof feature>[1],
        ) as unknown as FeatureCollection;
        if (alive) setFc(collection);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const { counts, max } = useMemo(() => {
    const m = new Map<string, number>();
    let mx = 0;
    for (const d of data) {
      m.set(d.label, (m.get(d.label) ?? 0) + d.count);
      mx = Math.max(mx, m.get(d.label)!);
    }
    return { counts: m, max: mx };
  }, [data]);

  // Albers-10m usa un lienzo nativo 975x610 → proyección nula (identidad).
  const path = useMemo(() => geoPath(null), []);

  if (!fc) {
    return <div className="h-[260px] animate-pulse rounded-xl bg-navy-900/40" />;
  }

  return (
    <svg viewBox="0 0 975 610" className="h-auto w-full" role="img" aria-label="Mapa de visitas por estado de EE. UU.">
      {fc.features.map((f: Feature<Geometry>, i) => {
        const name = (f.properties as { name?: string } | null)?.name ?? '';
        const count = counts.get(name) ?? 0;
        const d = path(f) ?? undefined;
        return (
          <path key={i} d={d} fill={goldFill(count, max)} stroke="rgba(10,26,47,0.9)" strokeWidth={0.5}>
            {count > 0 && <title>{`${name}: ${count}`}</title>}
          </path>
        );
      })}
    </svg>
  );
}

export function GeoMaps({ world, us }: { world: Datum[]; us: Datum[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass rounded-2xl p-6">
        <h3 className="mb-4 font-label text-[0.7rem] uppercase tracking-label text-gold-400">Visitas por país</h3>
        <WorldMap data={world} />
      </div>
      <div className="glass rounded-2xl p-6">
        <h3 className="mb-4 font-label text-[0.7rem] uppercase tracking-label text-gold-400">Estados Unidos por estado</h3>
        <USMap data={us} />
      </div>
    </div>
  );
}
