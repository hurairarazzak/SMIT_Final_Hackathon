import React from 'react'
import Dashboard from '../adminDashboard/Dashboard'
import Hero from '../../components/ui/Hero'
import LoanCategories from '../../components/ui/LoanCategory'
import LoanProcess from '../../components/ui/LoanProcess'
import SuccessStories from '../../components/ui/SuccessStories'
import NewsLetter from '../../components/ui/NewsLetter'

const Home = () => {
  return (
    <div>
      {/* <Dashboard /> */}
      <Hero />
      <LoanCategories />
      <LoanProcess />
      <SuccessStories />
      <NewsLetter />
    </div>
  )
}

export default Home