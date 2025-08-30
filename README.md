# 🌙 Moon Phase Calendar

A responsive React web application that tracks moon phases throughout the year.

## Features

- **Interactive Calendar**: Browse any month and year to explore moon phases
- **Detailed Day Views**: Click any date for comprehensive lunar information
- **Hemisphere Toggle**: Switch between Northern and Southern hemisphere moon phase displays
- **Real-Time Calculations**: Accurate moon phase data using the SunCalc Library
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation header
│   └── MoonListings.jsx # Calendar grid component
├── pages/              # Main page components
│   ├── HomePage.jsx    # Landing page
│   ├── MoonCalendarPage.jsx # Calendar Page
│   └── MoonDescPage.jsx # Detailed day view with moon phase description
├── utils/              # Utility functions
│   └── moonApiLocal.js # SunCalc calculations
├── layouts/            # Layout components
│   └── MainLayout.jsx  # App shell layout
└── App.jsx            # Root component with react routing
```

## Development Challenges & Solutions

### API Rate Limiting Challenge

**Problem**: Initially implemented using the IPGeolocation Astronomy API for moon phase data. However, the application quickly exceeded the free tier's 1,000 monthly request limit.

**Impact**: 
- Frequent "API limit exceeded" errors during development
- Potential scalability issues for production deployment

**Solution**: Architectural pivot to client-side calculations using the SunCalc library:

```javascript
// Before: External API dependency
const response = await fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&lat=${lat}&long=${lng}&date=${date}`);

// After: Local calculations
import SunCalc from 'suncalc';
const moonData = SunCalc.getMoonIllumination(date);
const moonPosition = SunCalc.getMoonPosition(date, latitude, longitude);
```

**Benefits of the Solution**:
- **Unlimited Usage**: No API rate limits or monthly costs
- **Better Performance**: Instant calculations without network requests  

## Features Explained

### Hemisphere-Aware Display
The application automatically adjusts moon phase emoji representations based on selected hemisphere:
- **Northern Hemisphere**: Traditional moon phase orientations
- **Southern Hemisphere**: Inverted orientations for accurate viewing

### Astronomical Data
Provides lunar data including:
- Moon phase names and illumination percentages
- Real-time distance from Earth (in kilometers)  

## Technical Implementation

### Moon Phase Calculations
Uses SunCalc library for:
- **Illumination Percentage**: Precise fraction of moon visibility
- **Phase Classification**: 8 distinct moon phases (New, Waxing Crescent, etc.)
- **Distance Calculations**: Real-time Earth-moon distance

### State Management
- React hooks (`useState`, `useEffect`) for component state
- URL-based navigation state with React Router

## Resources Used

- [SunCalc](https://github.com/mourner/suncalc) - Astronomical calculations
- [React](https://reactjs.org/) - UI framework  
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vite](https://vitejs.dev/) - Build tool
