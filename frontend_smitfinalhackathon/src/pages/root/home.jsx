import React from 'react'
import Dashboard from '../adminDashboard/Dashboard'
import Navbar from '../../components/ui/Navbar'
import Hero from '../../components/ui/Hero'
import Footer from '../../components/ui/Footer'

const Home = () => {
  return (
    <div>
      {/* <Dashboard /> */}
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}

export default Home