import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getMoonPhaseDataMonthLocal, 
  getMoonPhaseEmoji 
} from '../utils/sunCalc';

const MoonListings = ({ year, month, monthName }) => {
  //States
  const[hemisphere, setHemisphere] = useState('northern');
  const [moonData, setMoonData] = useState({}); // Store moon data for each day
  const [isLoading, setIsLoading] = useState(true);

  // Calculate moon phase data for the month (client-side)
  useEffect(() => {
    const calculateMoonData = () => {
      console.log('Calculating moon data for', monthName, year, 'hemisphere:', hemisphere);
      setIsLoading(true);
      
      try {
        // Get all moon data for the month using SunCalc
        const monthMoonData = getMoonPhaseDataMonthLocal(year, month);
        
        // Process the data for the current hemisphere
        const processedData = {};
        Object.entries(monthMoonData).forEach(([day, data]) => {
          const dayNum = parseInt(day);
          const phaseName = data.phaseName;
          const phaseEmoji = getMoonPhaseEmoji(phaseName, hemisphere);
          
          processedData[dayNum] = {
            illumination: data.illumination,
            phaseName: phaseName,
            emoji: phaseEmoji,
            moonPhase: data.moon_phase,
            phase: data.phase
          };
        });
        
        setMoonData(processedData);
        console.log(`Successfully calculated data for ${Object.keys(processedData).length} days`);
        
      } catch (error) {
        console.error('Error calculating moon data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    calculateMoonData();
  }, [year, month, hemisphere]); // Recalculate when year, month, or hemisphere changes

  // Toggle hemisphere function
  const toggleHemisphere = () => {
    setHemisphere(hemisphere === 'northern' ? 'southern' : 'northern');
  };

  // Day headers (Sunday to Saturday)
  const dayHeaders = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //For larger screens
  const dayHeadersShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];                         //For smaller screens
  
  // Calculate calendar grid
  const getDaysInMonth = () => {
    return new Date(year, month, 0).getDate(); // Last day of the month
  };
  
  const getFirstDayOfMonth = () => {
    return new Date(year, month - 1, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
  };
  
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          
          {/* Hemisphere Toggle */}
          <div className="mb-6 flex justify-center">
            <button
              onClick={toggleHemisphere}
              className="px-6 py-2 rounded-lg transition-colors duration-200 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
            >
              {hemisphere.charAt(0).toUpperCase() + hemisphere.slice(1)} Hemisphere
            </button>
          </div>
          
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayHeaders.map((day, index) => (
              <div key={day} className="text-center py-3 font-semibold text-white">
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{dayHeadersShort[index]}</span>
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div key={index} className="aspect-square">
                {day ? (
                  <Link 
                    to={`/moon/${year}/${month}/${day}`}
                    className="block h-full border border-white/20 rounded-lg p-1 sm:p-2 bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="h-full flex flex-col">
                      <div className="text-white font-medium text-xs sm:text-sm mb-1 flex-shrink-0">
                        {day}
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center">
                        {isLoading ? (
                          <>
                            <div className="text-yellow-300 text-xs">🌙</div>
                            <div className="text-gray-300 mt-1 text-xs">Loading...</div>
                          </>
                        ) : moonData[day] ? (
                          <>
                            <div className="flex-1 text-base sm:text-3x1 md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl flex items-center justify-center">
                              {moonData[day].emoji}</div>
                            <div className="text-gray-300 mt-1 text-center text-xs leading-tight px-1 hidden lg:block flex-shrink-0">
                              {moonData[day].phaseName}
                            </div>
                            <div className="text-yellow-300 text-xs flex-shrink-0 hidden lg:block">
                              {Math.round(moonData[day].illumination)}%
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-yellow-300 text-xs">🌙</div>
                            <div className="text-gray-300 mt-1 text-xs">Phase</div>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="h-full border border-transparent"></div>
                )}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MoonListings