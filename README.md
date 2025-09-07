## 🌙 Moon Phase Calendar

A React web application that tracks lunar cycles throughout the year, providing detailed moon phase information for any date. 

**Link to project:** https://tylerjtrinh.github.io/moon-phase-calendar/

## How It's Made:

**Tech used:** React, SunCalc Library, IPGeolocation Astronomy API

Key features include hemisphere-aware moon phase displays (showing correct orientations for Northern/Southern hemispheres), timezone selection for accurate local data, and a calendar grid that that uses moon emojis.

## Optimizations

Optimized API usage while maintaining accurate moon data. Initially, the entire application relied on the IPGeolocation API.

**Solution:** I implemented a hybrid data architecture
- **SunCalc for Calendar Grid:** Provide moon phase name for the monthly view without API calls
- **IPGeolocation API for Moon Detail Page:** Delivers moon data only when users click on a specific date

The calendar can now display unlimited months and years instantly, while detailed views provide moon data including illumination percentages, moonrise/moonset times, and moon distance from the Earth.

## Challenges Faced:

**Date Handling Across Timezones:** Ensuring accurate moon phase calculations for different global timezones required careful handling of timezone conversions.
