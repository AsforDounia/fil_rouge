import React from 'react'
import Header from '../Components/HomeComponents/Header'
import Footer from '../Components/HomeComponents/Footer'
// import { FaMapMarkerAlt, FaHeart, FaHospital, FaTint, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import HeroSection from '../Components/HomeComponents/HeroSection';
import FeaturesSection from '../Components/HomeComponents/FeaturesSection';
import CTASection from '../Components/HomeComponents/CTASection';
import ProcessSection from '../Components/HomeComponents/ProcessSection';
import StatsSection from '../Components/HomeComponents/StatsSection';
import TestimonialsSection from '../Components/HomeComponents/TestimonialsSection';
import EventsSection from '../Components/HomeComponents/EventsSection';
// import NewsSection from '../Components/HomeComponents/NewsSection';


function Home() {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
      {/* <Header /> */}
      {/* <main className="flex-1"> */}
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
            <TestimonialsSection />
            <CTASection />
            <ProcessSection />
            <EventsSection />
      {/* </main> */}
      {/* <Footer /> */}
      </div>
    </>
  )
}

export default Home


