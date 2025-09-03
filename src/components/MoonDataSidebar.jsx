import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatAPITime, getAstronomyData } from '../utils/moonApi'
import { getTimezoneDisplayName } from '../utils/timezone'

const MoonDataSidebar = ({ 
  moonData, 
  selectedTimezone, 
  year, 
  month,
  day
}) => {
  const [astronomyData, setAstronomyData] = useState(null);
  const [isLoadingAstronomy, setIsLoadingAstronomy] = useState(true);
  const [showMoreData, setShowMoreData] = useState(false);

  // Fetch astronomy data when component mounts or dependencies change
  useEffect(() => {
    const fetchAstronomyData = async () => {
      setIsLoadingAstronomy(true);
      
      try {
        const astroApiData = await getAstronomyData(
          parseInt(year), 
          parseInt(month), 
          parseInt(day),
          selectedTimezone
        );
        console.log('MoonDataSidebar: Received astronomy data:', astroApiData);
        setAstronomyData(astroApiData);
      } catch (error) {
        console.error('Error fetching astronomy data:', error);
      } finally {
        setIsLoadingAstronomy(false);
      }
    };

    fetchAstronomyData();
  }, [year, month, day, selectedTimezone]);

  return (
    <div className="lg:col-span-1 flex justify-center lg:justify-start lg:items-center">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-xl font-semibold text-white mb-6 text-center">Moon Data</h3>
        
        <div className="space-y-4">
          <div className="border-b border-white/20 pb-3">
            <div className="text-sm text-gray-300 mb-1">Timezone</div>
            <div className="text-lg text-white font-medium">
              {getTimezoneDisplayName(selectedTimezone)}
            </div>
          </div>
          
          <div className="border-b border-white/20 pb-3">
            <div className="text-sm text-gray-300 mb-1">Phase</div>
            <div className="text-lg text-white font-medium">
              {moonData ? moonData.phaseName : 'Loading...'}
            </div>
          </div>
          
          <div className="border-b border-white/20 pb-3">
            <div className="text-sm text-gray-300 mb-1">Illumination</div>
            <div className="text-lg text-white font-medium">
              {isLoadingAstronomy ? 'Loading...' : (astronomyData?.moon_illumination_percentage ? 
                astronomyData.moon_illumination_percentage + '%' : 
                (moonData ? moonData.illumination + '%' : 'Loading...')
              )}
            </div>
          </div>
          
          <div className="border-b border-white/20 pb-3">
            <div className="text-sm text-gray-300 mb-1">Moonrise</div>
            <div className="text-lg text-white font-medium">
              {isLoadingAstronomy ? 'Loading...' : (astronomyData ? 
                formatAPITime(astronomyData.moonrise, selectedTimezone) : 
                'No data'
              )}
            </div>
          </div>
          
          <div className="border-b border-white/20 pb-3">
            <div className="text-sm text-gray-300 mb-1">Moonset</div>
            <div className="text-lg text-white font-medium">
              {isLoadingAstronomy ? 'Loading...' : (astronomyData ? 
                formatAPITime(astronomyData.moonset, selectedTimezone) : 
                'No data'
              )}
            </div>
          </div>
          
          {/* Show More Button - only visible when collapsed */}
          {!showMoreData && (
            <div >
              <button
                onClick={() => setShowMoreData(!showMoreData)}
                className="w-full text-left text-sm text-purple-300 hover:text-purple-200 transition-colors duration-200 flex items-center justify-between cursor-pointer"
              >
                <span>Show More Data</span>
                <span className="transform">
                  ▼
                </span>
              </button>
            </div>
          )}
          
          {/* Expandable Additional Data */}
          {showMoreData && (
            <>
              
              <div className="border-b border-white/20 pb-3">
                <div className="text-sm text-gray-300 mb-1">Distance from Earth</div>
                <div className="text-lg text-white font-medium">
                {isLoadingAstronomy ? 'Loading...' : (astronomyData?.moon_distance ? 
                 `${Math.round(astronomyData.moon_distance).toLocaleString()} km` : 
                 'No data'
                )}
              </div>
            </div>

              <div className="border-b border-white/20 pb-3">
                <div className="text-sm text-gray-300 mb-1">Moon Angle</div>
                <div className="text-lg text-white font-medium">
                  {isLoadingAstronomy ? 'Loading...' : (astronomyData?.moon_angle ? 
                    `${Math.round(astronomyData.moon_angle * 10) / 10}°` : 
                    'No data'
                  )}
                </div>
              </div>
              
              <div className="border-b border-white/20 pb-3">
                <div className="text-sm text-gray-300 mb-1">Moon Altitude</div>
                <div className="text-lg text-white font-medium">
                  {isLoadingAstronomy ? 'Loading...' : (astronomyData?.moon_altitude !== undefined ? 
                    `${Math.round(astronomyData.moon_altitude * 10) / 10}°` : 
                    'No data'
                  )}
                </div>
              </div>
              
              <div className="border-b border-white/20 pb-3">
                <div className="text-sm text-gray-300 mb-1">Moon Azimuth</div>
                <div className="text-lg text-white font-medium">
                  {isLoadingAstronomy ? 'Loading...' : (astronomyData?.moon_azimuth ? 
                    `${Math.round(astronomyData.moon_azimuth * 10) / 10}°` : 
                    'No data'
                  )}
                </div>
              </div>
              
              {/* Show Less Button */}
              <div>
                <button
                  onClick={() => setShowMoreData(false)}
                  className="w-full text-left text-sm text-purple-300 hover:text-purple-200 transition-colors duration-200 flex items-center justify-between cursor-pointer"
                >
                  <span>Show Less</span>
                  <span className="transform rotate-180">
                    ▼
                  </span>
                </button>
              </div>
            </>
          )}   
        </div>
        
        {/* Back to Calendar Button */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <Link 
            to={`/calendar/${year}/${month}`}
            className="w-full bg-purple-600 hover:bg-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            ← Back to Calendar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MoonDataSidebar
