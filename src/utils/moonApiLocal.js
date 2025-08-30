// Client-side moon phase calculations using SunCalc
import SunCalc from 'suncalc';

/**
 * Get moon phase data for a specific date using client-side calculations
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @param {number} latitude - latitude for position calculations
 * @param {number} longitude - longitude for position calculations
 * @returns {Object} Moon phase data
 */
export const getMoonPhaseDataLocal = (year, month, day, latitude = 0, longitude = 0) => {
  const date = new Date(year, month - 1, day);
  const moonIllumination = SunCalc.getMoonIllumination(date);
  const moonPosition = SunCalc.getMoonPosition(date, latitude, longitude);
  
  // Convert SunCalc phase (0-1) to percentage
  const illuminationPercentage = Math.round(moonIllumination.fraction * 100);
  
  // Get moon distance in kilometers
  const distanceKm = Math.round(moonPosition.distance);
  
  // Determine phase based on phase value (0-1)
  const phase = moonIllumination.phase;
  let phaseName;
  
  if (phase < 0.03 || phase > 0.97) {
    phaseName = 'New Moon';
  } else if (phase < 0.22) {
    phaseName = 'Waxing Crescent';
  } else if (phase < 0.28) {
    phaseName = 'First Quarter';
  } else if (phase < 0.47) {
    phaseName = 'Waxing Gibbous';
  } else if (phase < 0.53) {
    phaseName = 'Full Moon';
  } else if (phase < 0.72) {
    phaseName = 'Waning Gibbous';
  } else if (phase < 0.78) {
    phaseName = 'Last Quarter';
  } else {
    phaseName = 'Waning Crescent';
  }
  
  return {
    moon_illumination_percentage: illuminationPercentage.toString(),
    moon_phase: phaseName.toUpperCase().replace(' ', '_'),
    illumination: illuminationPercentage,
    phaseName: phaseName,
    phase: phase,
    angle: moonIllumination.angle,
    distance: distanceKm
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
  const northernEmojiMap = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘'
  };
  
  // Southern hemisphere sees the moon "flipped" horizontally
  const southernEmojiMap = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌘', // Flipped
    'First Quarter': '🌗',   // Flipped
    'Waxing Gibbous': '🌖',  // Flipped
    'Full Moon': '🌕',
    'Waning Gibbous': '🌔',  // Flipped
    'Last Quarter': '🌓',    // Flipped
    'Waning Crescent': '🌒'  // Flipped
  };
  
  const emojiMap = hemisphere === 'southern' ? southernEmojiMap : northernEmojiMap;
  return emojiMap[phaseName] || '🌙';
};
