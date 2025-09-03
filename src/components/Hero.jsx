import { Link } from 'react-router-dom'
import { IoMoon, IoCalendar, IoArrowForward } from 'react-icons/io5'

const Hero = ({ 
  title = "Moon Calendar", 
  subtitle = "Track the lunar cycles throughout the year and discover moon phases.",
  showCTA = true,
  ctaText = "View Current Month"
}) => {
  // Variables for current month navigation
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  // Use current month as the link
  const linkTo = `/calendar/${currentYear}/${currentMonth}`;

  return (
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
                {title}
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            
            {/* CTA Button */}
            {showCTA && (
              <div className="flex justify-center items-center">
                <Link 
                  to={linkTo}
                  className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <IoCalendar className="w-5 h-5" />
                  <span>{ctaText}</span>
                  <IoArrowForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
