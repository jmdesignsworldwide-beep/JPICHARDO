/**
 * Utilidades de nombres de ubicación para el dashboard.
 * - `countryName` usa Intl.DisplayNames (nombres correctos para el ranking).
 * - `US_STATE_NAMES` mapea el código de región de Vercel al nombre completo
 *   (para el mapa de EE. UU., cuyas features usan el nombre completo).
 * - `ISO2_TO_NUM` mapea ISO-2 → id numérico de countries-110m para colorear
 *   el mapa mundial (subconjunto curado del público relevante; los países
 *   fuera del subconjunto igualmente aparecen en el ranking).
 */

let _dn: Intl.DisplayNames | null = null;
function displayNames(): Intl.DisplayNames | null {
  if (_dn) return _dn;
  try {
    _dn = new Intl.DisplayNames(['en'], { type: 'region' });
  } catch {
    _dn = null;
  }
  return _dn;
}

export function countryName(code: string | null | undefined): string {
  if (!code) return 'Desconocido';
  const dn = displayNames();
  if (dn) {
    try {
      const name = dn.of(code.toUpperCase());
      if (name && name !== code) return name;
    } catch {
      /* cae al código */
    }
  }
  return code.toUpperCase();
}

export const US_STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
  ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
  TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming', DC: 'District of Columbia',
};

export function stateName(code: string | null | undefined): string {
  if (!code) return 'Desconocido';
  return US_STATE_NAMES[code.toUpperCase()] ?? code.toUpperCase();
}

/** ISO-2 → id numérico (countries-110m). Subconjunto del público relevante. */
export const ISO2_TO_NUM: Record<string, string> = {
  US: '840', DO: '214', MX: '484', CA: '124', PR: '630',
  ES: '724', PT: '620', GB: '826', FR: '250', DE: '276', IT: '380',
  CO: '170', VE: '862', PE: '604', AR: '032', CL: '152', EC: '218',
  BO: '068', PY: '600', UY: '858', BR: '076',
  GT: '320', HN: '340', SV: '222', NI: '558', CR: '188', PA: '591',
  CU: '192', HT: '332', JM: '388',
};
