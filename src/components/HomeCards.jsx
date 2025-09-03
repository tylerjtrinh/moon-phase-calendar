import { IoMoon, IoCalendar } from 'react-icons/io5'

const HomeCards = () => {
  return (
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
  )
}

export default HomeCards
