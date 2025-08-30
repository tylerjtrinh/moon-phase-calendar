import React from 'react'
import { Link } from 'react-router-dom'
import { IoMoon, IoCalendar, IoArrowForward } from 'react-icons/io5'

const HomePage = () => {
  //Variables set to later navigate using the View Current Month Button
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            
            {/* Main Hero Content */}
            <div className="mb-12">
              <div className="flex justify-center mb-8">
                <IoMoon className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 text-yellow-300 drop-shadow-2xl" />
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Moon Calendar
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Track the lunar cycles throughout the year and discover moon phases.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex justify-center items-center">
                <Link 
                  to={`/calendar/${currentYear}/${currentMonth}`}
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <IoCalendar className="w-5 h-5" />
                  <span>View Current Month</span>
                  <IoArrowForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="text-center p-6 bg-white/10 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoMoon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Moon Phases</h3>
              <p className="text-gray-300">
                Track all lunar phases from new moon to full moon and everything in between.
              </p>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoCalendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Monthly View</h3>
              <p className="text-gray-300">
                Browse any month and year to see the complete lunar calendar.
              </p>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage