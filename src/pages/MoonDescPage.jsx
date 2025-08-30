import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  getMoonPhaseDataLocal, 
  getMoonPhaseEmoji 
} from '../utils/moonApiLocal'

const MoonDescPage = () => {
  const { year, month, day } = useParams();
  const [moonData, setMoonData] = useState(null);
  const [hemisphere, setHemisphere] = useState('northern');
  const [isLoading, setIsLoading] = useState(true);

  // Calculate moon phase data for this specific day
  useEffect(() => {
    const calculateMoonData = () => {
      setIsLoading(true);
      
      try {
        // Using default coordinates 
        const data = getMoonPhaseDataLocal(parseInt(year), parseInt(month), parseInt(day), 40.7128, -74.0060);
        
        if (data) {
          const phaseName = data.phaseName;
          const phaseEmoji = getMoonPhaseEmoji(phaseName, hemisphere);
          
          setMoonData({
            illumination: data.illumination,
            phaseName: phaseName,
            emoji: phaseEmoji,
            moonPhase: data.moon_phase,
            phase: data.phase,
            angle: data.angle,
            distance: data.distance
          });
        }
      } catch (err) {
        console.error('Error calculating moon data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    calculateMoonData();
  }, [year, month, day, hemisphere]);

  // Format the date for display
  const formatDate = () => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get phase description based on phase name
  const getPhaseDescription = (phaseName) => {
    const descriptions = {
      'New Moon': 'The New Moon is the lunar phase when the Moon is positioned between Earth and the Sun, making it invisible from Earth. This marks the beginning of the lunar cycle and is often associated with new beginnings and fresh starts.',
      'Waxing Crescent': 'The Waxing Crescent appears as a thin sliver of light on the right side of the Moon. This phase occurs as the Moon begins to move away from the Sun in its orbit, gradually revealing more of its illuminated surface.',
      'First Quarter': 'The First Quarter Moon appears as a perfect half-circle, with the right side illuminated. This phase occurs about a week after the New Moon and represents a time of decision-making and taking action.',
      'Waxing Gibbous': 'The Waxing Gibbous phase shows more than half of the Moon illuminated, continuing to grow toward the Full Moon. This is a time of refinement and adjustment as lunar energy builds.',
      'Full Moon': 'The Full Moon is the lunar phase when the Moon appears fully illuminated from Earth\'s perspective. This occurs when Earth is located between the Sun and the Moon, allowing the Sun\'s light to fully illuminate the Moon\'s surface that faces Earth.',
      'Waning Gibbous': 'The Waning Gibbous phase occurs after the Full Moon, when the illuminated area begins to decrease. This phase is associated with gratitude, sharing wisdom, and giving back.',
      'Last Quarter': 'The Last Quarter Moon appears as a half-circle with the left side illuminated. This phase represents a time of release, forgiveness, and letting go of what no longer serves you.',
      'Waning Crescent': 'The Waning Crescent appears as a thin sliver of light on the left side of the Moon. This final phase before the New Moon is a time for rest, reflection, and preparation for the new cycle ahead.'
    };
    
    return descriptions[phaseName] || 'This lunar phase represents a unique moment in the Moon\'s cycle around Earth.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900 px-4 sm:px-6 lg:px-8 py-8"> 
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              
              {/* Date Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center lg:text-left">
                {formatDate()}
              </h1>
              
              {/* Moon Phase Subtitle */}
              <h2 className="text-xl sm:text-2xl font-semibold text-purple-200 mb-6 text-center lg:text-left">
                {isLoading ? 'Loading...' : moonData ? moonData.phaseName : 'Unknown Phase'}
              </h2>
              
              {/* Moon Phase Icon */}
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="text-8xl">
                  {isLoading ? '🌙' : moonData ? moonData.emoji : '🌙'}
                </div>
              </div>
              
              {/* Hemisphere Toggle */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <button
                  onClick={() => setHemisphere(hemisphere === 'northern' ? 'southern' : 'northern')}
                  className="px-4 py-2 rounded-lg transition-colors duration-200 bg-purple-600 hover:bg-purple-700 text-white text-sm"
                >
                  {hemisphere.charAt(0).toUpperCase() + hemisphere.slice(1)} Hemisphere View
                </button>
              </div>
              
              {/* Description */}
              <div className="text-gray-200 text-lg leading-relaxed">
                {isLoading ? (
                  <p>Loading moon phase information...</p>
                ) : moonData ? (
                  <>
                    <p className="mb-4">
                      {getPhaseDescription(moonData.phaseName)}
                    </p>
                    <p className="mb-4">
                      {moonData.phaseName === 'Full Moon' ? (
                        'During a Full Moon, the lunar disc appears completely round and bright, making it the most recognizable phase of the lunar cycle. This phase typically lasts for about three days, though the Moon appears fullest for just one night.'
                      ) : moonData.phaseName === 'New Moon' ? (
                        'The New Moon phase lasts for about three days, during which the Moon is not visible in the night sky. This is an excellent time for stargazing as there is no moonlight to interfere with viewing fainter celestial objects.'
                      ) : (
                        `This ${moonData.phaseName} phase is part of the Moon's continuous cycle, which takes approximately 29.5 days to complete. Each phase offers a unique perspective on our celestial companion.`
                      )}
                    </p>
                  </>
                ) : (
                  <p>Unable to load moon phase information for this date.</p>
                )}
              </div>
              
            </div>
            
            {/* Right Sidebar - Data */}
            <div className="lg:col-span-1 flex justify-center lg:justify-start lg:items-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 w-full max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Moon Data</h3>
                
                <div className="space-y-4">
                  <div className="border-b border-white/20 pb-3">
                    <div className="text-sm text-gray-300 mb-1">Phase</div>
                    <div className="text-lg text-white font-medium">
                      {isLoading ? 'Loading...' : moonData ? moonData.phaseName : 'Unknown'}
                    </div>
                  </div>
                  
                  <div className="border-b border-white/20 pb-3">
                    <div className="text-sm text-gray-300 mb-1">Illumination</div>
                    <div className="text-lg text-white font-medium">
                      {isLoading ? 'Loading...' : moonData ? moonData.illumination + '%' : 'Unknown'}
                    </div>
                  </div>
                  
                  <div className="border-b border-white/20 pb-3">
                    <div className="text-sm text-gray-300 mb-1">Distance from Earth</div>
                    <div className="text-lg text-white font-medium">
                      {isLoading ? 'Loading...' : moonData ? 
                        `${moonData.distance.toLocaleString()} km` : 
                        'Unknown'
                      }
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-300 mb-1">Hemisphere</div>
                    <div className="text-lg text-white font-medium capitalize">
                      {hemisphere}
                    </div>
                  </div>
                  
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
            
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MoonDescPage