import SunCalc from 'suncalc';
import { 
  MOON_PHASES, 
  MOON_PHASE_THRESHOLDS, 
  MOON_PHASE_EMOJIS_NORTHERN, 
  MOON_PHASE_EMOJIS_SOUTHERN,
  DEFAULT_MOON_EMOJI 
} from '../constants/phaseConstants';

/**
 * Get moon phase data for a specific date using client-side calculations
 * Returns phase, illumination, and emoji - use IPGeolocation API for timing/position data
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @returns {Object} Moon phase data (phase name, illumination, emoji)
 */
export const getMoonPhaseDataLocal = (year, month, day) => {
  const date = new Date(year, month - 1, day);
  const moonIllumination = SunCalc.getMoonIllumination(date);
  
  // Convert SunCalc phase (0-1) to percentage
  const illuminationPercentage = Math.round(moonIllumination.fraction * 100);
  
  // Determine phase based on phase value (0-1) using values from phaseConstants.js
  const phase = moonIllumination.phase;
  let phaseName;
  
  if ((phase >= MOON_PHASE_THRESHOLDS.NEW_MOON[0] && phase <= MOON_PHASE_THRESHOLDS.NEW_MOON[1]) ||
      (phase >= MOON_PHASE_THRESHOLDS.NEW_MOON_END[0] && phase <= MOON_PHASE_THRESHOLDS.NEW_MOON_END[1])) {
    phaseName = MOON_PHASES.NEW_MOON;
  } else if (phase >= MOON_PHASE_THRESHOLDS.WAXING_CRESCENT[0] && phase < MOON_PHASE_THRESHOLDS.WAXING_CRESCENT[1]) {
    phaseName = MOON_PHASES.WAXING_CRESCENT;
  } else if (phase >= MOON_PHASE_THRESHOLDS.FIRST_QUARTER[0] && phase < MOON_PHASE_THRESHOLDS.FIRST_QUARTER[1]) {
    phaseName = MOON_PHASES.FIRST_QUARTER;
  } else if (phase >= MOON_PHASE_THRESHOLDS.WAXING_GIBBOUS[0] && phase < MOON_PHASE_THRESHOLDS.WAXING_GIBBOUS[1]) {
    phaseName = MOON_PHASES.WAXING_GIBBOUS;
  } else if (phase >= MOON_PHASE_THRESHOLDS.FULL_MOON[0] && phase < MOON_PHASE_THRESHOLDS.FULL_MOON[1]) {
    phaseName = MOON_PHASES.FULL_MOON;
  } else if (phase >= MOON_PHASE_THRESHOLDS.WANING_GIBBOUS[0] && phase < MOON_PHASE_THRESHOLDS.WANING_GIBBOUS[1]) {
    phaseName = MOON_PHASES.WANING_GIBBOUS;
  } else if (phase >= MOON_PHASE_THRESHOLDS.LAST_QUARTER[0] && phase < MOON_PHASE_THRESHOLDS.LAST_QUARTER[1]) {
    phaseName = MOON_PHASES.LAST_QUARTER;
  } else {
    phaseName = MOON_PHASES.WANING_CRESCENT;
  }
  
  return {
    moon_illumination_percentage: illuminationPercentage.toString(),
    moon_phase: phaseName.toUpperCase().replace(' ', '_'),
    illumination: illuminationPercentage,
    phaseName: phaseName,
    phase: phase,
    angle: moonIllumination.angle
  };
};

/**
 * Get moon phase data for all days in a month (client-side)
 * @param {number} year 
 * @param {number} month 
 * @returns {Object} Object with day as key and moon data as value
 */
export const getMoonPhaseDataMonthLocal = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthData = {};
  
  for (let day = 1; day <= daysInMonth; day++) {
    const data = getMoonPhaseDataLocal(year, month, day);
    monthData[day] = data;
  }
  
  return monthData;
};

/**
 * Get moon phase emoji based on hemisphere
 * @param {string} phaseName - Moon phase name
 * @param {string} hemisphere - 'northern' or 'southern'
 * @returns {string} Moon phase emoji
 */
export const getMoonPhaseEmoji = (phaseName, hemisphere = 'northern') => {
  const emojiMap = hemisphere === 'southern' ? MOON_PHASE_EMOJIS_SOUTHERN : MOON_PHASE_EMOJIS_NORTHERN;
  return emojiMap[phaseName] || DEFAULT_MOON_EMOJI;
};
