export type AccentId = 'orange';

export interface AccentPreset {
  id: AccentId;
  label: string;
  swatchHex: string;
  chartPrimary: string;
  chartSecondary: string;
  tooltipBorder: string;
}

export const DEFAULT_ACCENT: AccentId = 'orange';

export const SIGNAL_ORANGE_THEME: AccentPreset = {
  id: 'orange',
  label: 'Signal Orange',
  swatchHex: '#FF5E1A',
  chartPrimary: '#FF7A3D',
  chartSecondary: '#E4E4E7',
  tooltipBorder: 'rgba(255, 122, 61, 0.45)',
};

export const ACCENT_PRESETS: Record<AccentId, AccentPreset> = {
  orange: SIGNAL_ORANGE_THEME,
};

export function isValidAccent(value: string | null | undefined): value is AccentId {
  return value === 'orange';
}

export function resolveAccent(value: string | null | undefined): AccentId {
  return isValidAccent(value) ? value : DEFAULT_ACCENT;
}
