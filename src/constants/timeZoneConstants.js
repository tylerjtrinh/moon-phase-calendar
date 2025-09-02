// Timezone constants and coordinate mappings

/**
 * Timezone coordinates for major cities
 * Used for API calls that require lat/lng coordinates
 */
export const TIMEZONE_COORDINATES = {
  'America/New_York': { lat: 40.7128, lng: -74.0060, city: 'New York' },
  'America/Chicago': { lat: 41.8781, lng: -87.6298, city: 'Chicago' },
  'America/Denver': { lat: 39.7392, lng: -104.9903, city: 'Denver' },
  'America/Los_Angeles': { lat: 34.0522, lng: -118.2437, city: 'Los Angeles' },
  'America/Anchorage': { lat: 61.2181, lng: -149.9003, city: 'Anchorage' },
  'Pacific/Honolulu': { lat: 21.3099, lng: -157.8581, city: 'Honolulu' },
  'Europe/London': { lat: 51.5074, lng: -0.1278, city: 'London' },
  'Europe/Paris': { lat: 48.8566, lng: 2.3522, city: 'Paris' },
  'Europe/Berlin': { lat: 52.5200, lng: 13.4050, city: 'Berlin' },
  'Europe/Rome': { lat: 41.9028, lng: 12.4964, city: 'Rome' },
  'Europe/Madrid': { lat: 40.4168, lng: -3.7038, city: 'Madrid' },
  'Europe/Moscow': { lat: 55.7558, lng: 37.6173, city: 'Moscow' },
  'Asia/Tokyo': { lat: 35.6762, lng: 139.6503, city: 'Tokyo' },
  'Asia/Shanghai': { lat: 31.2304, lng: 121.4737, city: 'Shanghai' },
  'Asia/Kolkata': { lat: 28.7041, lng: 77.1025, city: 'New Delhi' },
  'Asia/Dubai': { lat: 25.2048, lng: 55.2708, city: 'Dubai' },
  'Australia/Sydney': { lat: -33.8688, lng: 151.2093, city: 'Sydney' },
  'Australia/Melbourne': { lat: -37.8136, lng: 144.9631, city: 'Melbourne' },
  'Australia/Perth': { lat: -31.9505, lng: 115.8605, city: 'Perth' },
  'Pacific/Auckland': { lat: -36.8485, lng: 174.7633, city: 'Auckland' }
};

/**
 * Popular timezones for the timezone selector dropdown
 */
export const POPULAR_TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
  { value: 'Europe/Rome', label: 'Rome (CET/CEST)' },
  { value: 'Europe/Madrid', label: 'Madrid (CET/CEST)' },
  { value: 'Europe/Moscow', label: 'Moscow (MSK)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Beijing (CST)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
  { value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT)' },
  { value: 'Australia/Perth', label: 'Perth (AWST)' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' }
];

/**
 * Default timezone (fallback)
 */
export const DEFAULT_TIMEZONE = 'America/Los_Angeles';

/**
 * Default date/time formatting options
 */
export const DATE_FORMAT_OPTIONS = {
  DISPLAY: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  },
  TIME: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  },
  TIME_WITH_SECONDS: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  }
};
