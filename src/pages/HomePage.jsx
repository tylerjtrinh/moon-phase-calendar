import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900">
      <Hero />
      <HomeCards /> 
    </div>
  )
}

export default HomePage