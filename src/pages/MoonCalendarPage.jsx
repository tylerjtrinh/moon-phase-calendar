import React from 'react'
import { IoMoon, IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useParams, Link, Navigate } from 'react-router-dom'
import MoonListings from '../components/MoonListings'

const MoonCalendarPage = () => {
  const { year: urlYear, month: urlMonth } = useParams();
  
  // Default to current date if no props or URL params provided
  const today = new Date();
  
  // Check if URL params are valid numbers
  const isValidNumber = (str) => {
    return str && !isNaN(str) && !isNaN(parseInt(str)) && str.trim() !== '';
  };
  
  // Only use URL params if they're valid numbers
  const year = (urlYear && isValidNumber(urlYear)) ? parseInt(urlYear) : today.getFullYear();
  const month = (urlMonth && isValidNumber(urlMonth)) ? parseInt(urlMonth) : today.getMonth() + 1;
  
  // Validation: Check if year and month are in valid ranges
  const isValidYear = year >= 1900 && year <= 2100; // Reasonable year range
  const isValidMonth = month >= 1 && month <= 12;
  
  // If URL params exist but are invalid (not numbers or out of range), redirect to 404
  if ((urlYear || urlMonth) && (!isValidNumber(urlYear) || !isValidNumber(urlMonth) || !isValidYear || !isValidMonth)) {
    return <Navigate to="/404" replace />;
  }
  
  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month - 1];

  // Navigation logic
  const getPreviousMonth = () => {
    if (month === 1) {
      return { year: year - 1, month: 12 };
    }
    return { year, month: month - 1 };
  };

  const getNextMonth = () => {
    if (month === 12) {
      return { year: year + 1, month: 1 };
    }
    return { year, month: month + 1 };
  };

  const prevMonth = getPreviousMonth();
  const nextMonth = getNextMonth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="text-yellow-300">{monthName} {year}</span> Moon Calendar
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            Track the lunar cycles for {monthName} {year}
          </p>
          <div className="flex justify-center">
            <IoMoon className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-yellow-300 drop-shadow-2xl" />
          </div>
        </div>
      </div>
      
      {/* Month Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Link 
              to={`/calendar/${prevMonth.year}/${prevMonth.month}`}
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-200"
            >
              <IoChevronBack className="w-5 h-5" />
              <span className="hidden sm:inline">
                {monthNames[prevMonth.month - 1]} {prevMonth.year}
              </span>
              <span className="sm:hidden">Previous</span>
            </Link>
            
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {monthName} {year}
              </h2>
            </div>
            
            <Link 
              to={`/calendar/${nextMonth.year}/${nextMonth.month}`}
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-200"
            >
              <span className="hidden sm:inline">
                {monthNames[nextMonth.month - 1]} {nextMonth.year}
              </span>
              <span className="sm:hidden">Next</span>
              <IoChevronForward className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Calendar Content */}
      <MoonListings year={year} month={month} monthName={monthName} />
    </div>
  )
}

export default MoonCalendarPage