import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
"min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900"
const NotFound = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900">
      <div className="text-center flex flex-col justify-center items-center h-96">
          <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
        <h1 className="text-white text-6xl font-bold mb-4">404 Not Found</h1>
        <p className="text-white text-xl mb-5">This page does not exist</p>
        <Link
          to="/"
          className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
          >Go Back
          </Link>
      </div>
    </section>
  )
}

export default NotFound