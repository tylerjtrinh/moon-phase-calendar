import { NavLink } from 'react-router-dom';
import moonImage from '../assets/images/moon.png';


const Navbar = () => {
    //Variables set to later navigate using the View Current Month Button
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate(); 

  const linkClass = ({ isActive }) => 
    isActive 
      ? 'text-black bg-yellow-400 hover:bg-white hover:text-black rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium'
      : 'text-white hover:bg-white hover:text-black rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium';

  return (
    <nav className="bg-indigo-950">
      <div className="px-2 sm:px-4 lg:px-6">
        <div className="flex h-16 sm:h-20 items-center">
          {/* Logo/Title */}
          <div className="flex items-center justify-start">
            <NavLink className="flex flex-shrink-0 items-center" to="/">
              <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold flex items-center">
                <img 
                    src={moonImage} 
                    alt="Moon" 
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mr-2" 
                />
                <span className="sm:inline">Moon Calendar</span>
              </span>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="flex-shrink-0 ml-auto mr-12 sm:mr-16 lg:mr-20">
            <div className="flex space-x-1 sm:space-x-2">
              <NavLink to="/calendar" className={linkClass}>
                <span className="hidden sm:inline">Monthly Calendar</span>
                <span className="sm:hidden">Calendar</span>
              </NavLink>
              <NavLink to={`/moon/${currentYear}/${currentMonth}/${currentDay}`} className={linkClass}>
                <span className="hidden sm:inline">Today's Moon</span>
                <span className="sm:hidden">Today</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar