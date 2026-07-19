import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getAdminClient } from '@/lib/supabase/admin';
import { countryName, stateName } from '@/lib/geo-names';

export type Range = '7' | '30' | 'all';

export type CountItem = { key: string; label: string; count: number };
export type CityItem = { city: string; region: string | null; country: string | null; count: number };
export type DayItem = { date: string; count: number };
export type Subscriber = { email: string; created_at: string; source: string | null };

export type Analytics = {
  configured: boolean;
  range: Range;
  totals: {
    visits: number;
    countries: number;
    amazon: number;
    devotional: number;
    subscribers: number;
  };
  topCountry: CountItem | null;
  topRegion: CountItem | null;
  byCountry: CountItem[];
  byRegion: CountItem[]; // estados de EE. UU.
  byCity: CityItem[];
  byPath: CountItem[];
  amazonByBook: CountItem[];
  devotionalByTarget: CountItem[];
  visitsByDay: DayItem[];
  subscribers: Subscriber[];
};

const PAGE = 1000;
const MAX_ROWS = 50_000; // tope de agregación (suficiente para este volumen)

function sinceISO(range: Range): string | null {
  if (range === 'all') return null;
  const days = range === '7' ? 7 : 30;
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

async function fetchAll<T>(
  admin: SupabaseClient,
  table: string,
  columns: string,
  since: string | null,
): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; from < MAX_ROWS; from += PAGE) {
    let q = admin.from(table).select(columns).order('created_at', { ascending: false }).range(from, from + PAGE - 1);
    if (since) q = q.gte('created_at', since);
    const { data, error } = await q;
    if (error || !data || data.length === 0) break;
    rows.push(...(data as T[]));
    if (data.length < PAGE) break;
  }
  return rows;
}

function tally(map: Map<string, number>, key: string | null | undefined) {
  if (!key) return;
  map.set(key, (map.get(key) ?? 0) + 1);
}

function topN(map: Map<string, number>, label: (k: string) => string, n = 20): CountItem[] {
  return [...map.entries()]
    .map(([key, count]) => ({ key, label: label(key), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

const EMPTY: Analytics = {
  configured: false,
  range: '30',
  totals: { visits: 0, countries: 0, amazon: 0, devotional: 0, subscribers: 0 },
  topCountry: null,
  topRegion: null,
  byCountry: [],
  byRegion: [],
  byCity: [],
  byPath: [],
  amazonByBook: [],
  devotionalByTarget: [],
  visitsByDay: [],
  subscribers: [],
};

export async function getAnalytics(range: Range): Promise<Analytics> {
  const admin = getAdminClient();
  if (!admin) return { ...EMPTY, range };
  const since = sinceISO(range);

  type PV = { path: string; country: string | null; region: string | null; city: string | null; created_at: string };
  type AC = { book_slug: string; country: string | null };
  type DC = { target: string };

  const [views, amazon, devotional, subsRaw] = await Promise.all([
    fetchAll<PV>(admin, 'page_views', 'path,country,region,city,created_at', since),
    fetchAll<AC>(admin, 'amazon_clicks', 'book_slug,country', since),
    fetchAll<DC>(admin, 'devotional_clicks', 'target', since),
    fetchAll<Subscriber>(admin, 'subscribers', 'email,created_at,source', since),
  ]);

  const byCountry = new Map<string, number>();
  const byRegion = new Map<string, number>();
  const byCity = new Map<string, { city: string; region: string | null; country: string | null; count: number }>();
  const byPath = new Map<string, number>();
  const byDay = new Map<string, number>();

  for (const v of views) {
    tally(byCountry, v.country);
    if (v.country === 'US') tally(byRegion, v.region);
    if (v.city) {
      const k = `${v.city}|${v.region ?? ''}|${v.country ?? ''}`;
      const e = byCity.get(k);
      if (e) e.count += 1;
      else byCity.set(k, { city: v.city, region: v.region, country: v.country, count: 1 });
    }
    tally(byPath, v.path);
    const day = v.created_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }

  const amazonByBook = new Map<string, number>();
  for (const a of amazon) tally(amazonByBook, a.book_slug);

  const devByTarget = new Map<string, number>();
  for (const d of devotional) tally(devByTarget, d.target);

  const byCountryArr = topN(byCountry, countryName, 50);
  const byRegionArr = topN(byRegion, stateName, 50);
  const visitsByDay = [...byDay.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    configured: true,
    range,
    totals: {
      visits: views.length,
      countries: byCountry.size,
      amazon: amazon.length,
      devotional: devotional.length,
      subscribers: subsRaw.length,
    },
    topCountry: byCountryArr[0] ?? null,
    topRegion: byRegionArr[0] ?? null,
    byCountry: byCountryArr,
    byRegion: byRegionArr,
    byCity: [...byCity.values()].sort((a, b) => b.count - a.count).slice(0, 20),
    byPath: topN(byPath, (k) => k, 15),
    amazonByBook: topN(amazonByBook, (k) => k, 10),
    devotionalByTarget: topN(devByTarget, (k) => k, 10),
    visitsByDay,
    subscribers: subsRaw,
  };
}
