// Moon phase constants and mappings

/**
 * Moon phase names
 */
export const MOON_PHASES = {
  NEW_MOON: 'New Moon',
  WAXING_CRESCENT: 'Waxing Crescent',
  FIRST_QUARTER: 'First Quarter',
  WAXING_GIBBOUS: 'Waxing Gibbous',
  FULL_MOON: 'Full Moon',
  WANING_GIBBOUS: 'Waning Gibbous',
  LAST_QUARTER: 'Last Quarter',
  WANING_CRESCENT: 'Waning Crescent'
};

/**
 * Moon phase thresholds for determining phase based on SunCalc phase value (0-1)
 */
export const MOON_PHASE_THRESHOLDS = {
  NEW_MOON: [0, 0.03],
  WAXING_CRESCENT: [0.03, 0.22],
  FIRST_QUARTER: [0.22, 0.28],
  WAXING_GIBBOUS: [0.28, 0.47],
  FULL_MOON: [0.47, 0.53],
  WANING_GIBBOUS: [0.53, 0.72],
  LAST_QUARTER: [0.72, 0.78],
  WANING_CRESCENT: [0.78, 0.97],
  NEW_MOON_END: [0.97, 1]
};

/**
 * Moon phase emojis for northern hemisphere
 */
export const MOON_PHASE_EMOJIS_NORTHERN = {
  [MOON_PHASES.NEW_MOON]: '🌑',
  [MOON_PHASES.WAXING_CRESCENT]: '🌒',
  [MOON_PHASES.FIRST_QUARTER]: '🌓',
  [MOON_PHASES.WAXING_GIBBOUS]: '🌔',
  [MOON_PHASES.FULL_MOON]: '🌕',
  [MOON_PHASES.WANING_GIBBOUS]: '🌖',
  [MOON_PHASES.LAST_QUARTER]: '🌗',
  [MOON_PHASES.WANING_CRESCENT]: '🌘'
};

/**
 * Moon phase emojis for southern hemisphere (flipped horizontally)
 */
export const MOON_PHASE_EMOJIS_SOUTHERN = {
  [MOON_PHASES.NEW_MOON]: '🌑',
  [MOON_PHASES.WAXING_CRESCENT]: '🌘',  // Flipped
  [MOON_PHASES.FIRST_QUARTER]: '🌗',    // Flipped
  [MOON_PHASES.WAXING_GIBBOUS]: '🌖',   // Flipped
  [MOON_PHASES.FULL_MOON]: '🌕',
  [MOON_PHASES.WANING_GIBBOUS]: '🌔',   // Flipped
  [MOON_PHASES.LAST_QUARTER]: '🌓',     // Flipped
  [MOON_PHASES.WANING_CRESCENT]: '🌒'   // Flipped
};

/**
 * Default moon emoji fallback
 */
export const DEFAULT_MOON_EMOJI = '🌙';

/**
 * Hemisphere options
 */
export const HEMISPHERES = {
  NORTHERN: 'northern',
  SOUTHERN: 'southern'
};

/**
 * Default hemisphere
 */
export const DEFAULT_HEMISPHERE = HEMISPHERES.NORTHERN;
