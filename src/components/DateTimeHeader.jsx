import { useState, useEffect } from 'react'
import { 
  getPopularTimezones, 
  getTimezoneDisplayName
} from '../utils/timezone'

const DateTimeHeader = ({ 
  year, 
  month, 
  day, 
  selectedTimezone, 
  setSelectedTimezone
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTimezoneSelector, setShowTimezoneSelector] = useState(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the date for display
  const formatDate = () => {
    const selectedDate = new Date(year, month - 1, day);
    
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  // Format current time for display
  const formatCurrentTime = () => {
    return currentTime.toLocaleString('en-US', {
      timeZone: selectedTimezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
  };

  // Check if the selected date is today
  // only want to display current time for today
  const isToday = () => {
    // Get today's date in the selected timezone
    const todayInTimezone = new Date().toLocaleDateString('en-CA', {
      timeZone: selectedTimezone
    }); // Returns YYYY-MM-DD format
    
    // Format selected date as YYYY-MM-DD
    const selectedDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return todayInTimezone === selectedDateString;
  };

  return (
    <div>
      {/* Date Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center lg:text-left">
        {formatDate()}
      </h1>
      
      {/* Current Time and Timezone Selector */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
        <div className="relative">
          <button
            onClick={() => setShowTimezoneSelector(!showTimezoneSelector)}
            className="px-3 py-1 rounded-lg transition-colors duration-200 bg-transparent hover:bg-white/10 text-blue-200 hover:text-white text-sm border border-blue-300/50 hover:border-blue-200 flex items-center gap-2 cursor-pointer"
          >
            🌍 {getTimezoneDisplayName(selectedTimezone)}
            <span className="text-xs">▼</span>
          </button>
          
          {showTimezoneSelector && (
            <div className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto min-w-64">
              {getPopularTimezones().map((tz) => (
                <button
                  key={tz.value}
                  onClick={() => {
                    setSelectedTimezone(tz.value);
                    setShowTimezoneSelector(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-blue-100 transition-colors duration-200 text-gray-800 text-sm cursor-pointer ${
                    selectedTimezone === tz.value ? 'bg-blue-100 font-medium' : ''
                  }`}
                >
                  {tz.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Only show current time if viewing today's date */}
        {isToday() && (
          <div className="text-lg text-blue-200">
            Current time: {formatCurrentTime()}
          </div>
        )}
      </div>
    </div>
  )
}

export default DateTimeHeader;
