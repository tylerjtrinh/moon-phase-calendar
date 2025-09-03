// Timezone utilities for handling user's timezone and timezone selection
import { POPULAR_TIMEZONES } from '../constants/timeZoneConstants';

/**
 * Get the user's browser timezone
 * @returns {string} Browser timezone (e.g., "America/New_York")
 */
export const getBrowserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Get popular timezones for the timezone selector
 * @returns {Array} Array of timezone objects
 */
export const getPopularTimezones = () => {
  return POPULAR_TIMEZONES;
};

/**
 * Get timezone display name
 * @param {string} timezone - Timezone identifier
 * @returns {string} Human-readable timezone name
 */
export const getTimezoneDisplayName = (timezone) => {
  const popularTimezones = getPopularTimezones();
  const found = popularTimezones.find(tz => tz.value === timezone);
  
  if (found) {
    return found.label;
  }
  
  // Fallback: format timezone identifier
  return timezone.replace('_', ' ').split('/').pop();
};
