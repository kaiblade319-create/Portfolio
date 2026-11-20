export type AccentId = 'sage';

export interface AccentPreset {
  id: AccentId;
  label: string;
  swatchHex: string;
  chartPrimary: string;
  chartSecondary: string;
  tooltipBorder: string;
}

export const DEFAULT_ACCENT: AccentId = 'sage';

export const WARM_PAPER_THEME: AccentPreset = {
  id: 'sage',
  label: 'Warm Cream Paper',
  swatchHex: '#2B6E73',
  chartPrimary: '#2B6E73',
  chartSecondary: '#7B9486',
  tooltipBorder: 'rgba(43, 110, 115, 0.28)',
};

export const ACCENT_PRESETS: Record<AccentId, AccentPreset> = {
  sage: WARM_PAPER_THEME,
};

export function isValidAccent(value: string | null | undefined): value is AccentId {
  return value === 'sage';
}

export function resolveAccent(value: string | null | undefined): AccentId {
  return isValidAccent(value) ? value : DEFAULT_ACCENT;
}
