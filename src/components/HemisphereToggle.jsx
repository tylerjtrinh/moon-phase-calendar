
const HemisphereToggle = ({ hemisphere, setHemisphere }) => {
  return (
    <div className="mb-6 flex justify-center lg:justify-start">
      <button
        onClick={() => setHemisphere(hemisphere === 'northern' ? 'southern' : 'northern')}
        className="px-4 py-2 rounded-lg transition-colors duration-200 bg-purple-600 hover:bg-purple-700 text-white text-sm cursor-pointer"
      >
        {hemisphere.charAt(0).toUpperCase() + hemisphere.slice(1)} Hemisphere View
      </button>
    </div>
  )
}

export default HemisphereToggle;
