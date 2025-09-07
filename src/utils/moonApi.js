//Data for coordinates, popular timezones, default timezone is Los Angeles
import { TIMEZONE_COORDINATES, DEFAULT_TIMEZONE } from '../constants/timeZoneConstants';
import { HEMISPHERES, DEFAULT_HEMISPHERE } from '../constants/phaseConstants';

/**
 * Get coordinates for major timezones
 * @param {string} timezone - Timezone identifier
 * @returns {Object} Coordinates for the timezone
 */
const getTimezoneCoordinates = (timezone) => {
  // Return coordinates for timezone or default to Los Angeles
  return TIMEZONE_COORDINATES[timezone] || TIMEZONE_COORDINATES[DEFAULT_TIMEZONE];
};

/**
 * Get hemisphere from timezone coordinates
 * @param {string} timezone - Timezone identifier
 * @returns {string} Hemisphere constant ('northern' or 'southern')
 */
export const getHemisphereFromTimezone = (timezone) => {
  const coords = getTimezoneCoordinates(timezone);
  
  // Return hemisphere constant based on latitude
  if (coords.lat >= 0) {
    return HEMISPHERES.NORTHERN;
  } else {
    return HEMISPHERES.SOUTHERN;
  }
};

/**
 * Get hemisphere with fallback to default
 * @param {string} timezone - Timezone identifier
 * @returns {string} Hemisphere constant with fallback
 */
export const getHemisphereWithFallback = (timezone) => {
  try {
    return getHemisphereFromTimezone(timezone);
  } catch (error) {
    console.warn('Could not determine hemisphere for timezone:', timezone, 'Using default:', DEFAULT_HEMISPHERE);
    return DEFAULT_HEMISPHERE;
  }
};

/**
 * Get moon data for a specific date and timezone using IPGeolocation API
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @param {string} timezone - Timezone identifier (ex: 'America/New_York')
 * @returns {Object} moon data including moon rise/set times and positions
 */
export const getAstronomyData = async (year, month, day, timezone) => {
  const apiKey = import.meta.env.VITE_IPGEOLOCATION_API_KEY;
  
  if (!apiKey) {
    console.error('No API key found');
    return null;
  }
  
  // Get coordinates for the timezone
  const coords = getTimezoneCoordinates(timezone);
  
  // Format date as YYYY-MM-DD
  const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  try {
    const url = `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&lat=${coords.lat}&long=${coords.lng}&date=${date}`;
    const res = await fetch(url);
    
    if (!res.ok) {
      console.error('API request failed:', res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    
    // Check if we have the expected moon data fields
    if (data) {
      return {
        moonrise: data.moonrise || 'No moonrise',
        moonset: data.moonset || 'No moonset',
        moon_distance: data.moon_distance,
        moon_altitude: data.moon_altitude,
        moon_azimuth: data.moon_azimuth,
        moon_illumination_percentage: Math.abs(Number(data.moon_illumination_percentage)),
        moon_angle: data.moon_angle,
        timezone: timezone, // Use the input timezone
        date: data.date
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching astronomy data:', error);
    return null;
  }
};

/**
 * Format API time string to readable format
 * @param {string} timeString - Time string from API (e.g., "2025-09-02 15:23")
 * @param {string} timezone - Target timezone
 * @returns {string} Formatted time
 */
export const formatAPITime = (timeString) => {
  if (!timeString || timeString === '-:-' || timeString === 'No moonrise' || timeString === 'No moonset') {
    return timeString;
  }
  
  try {
    // API returns time in a 24 hour clock format, so converting format
    // Use today's date with the provided time
    const today = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Create a date object with today's date and the API time
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
    
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
};
