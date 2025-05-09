import React from 'react'
import Header from '../Components/HomeComponents/Header'
import Footer from '../Components/HomeComponents/Footer'
// import { FaMapMarkerAlt, FaHeart, FaHospital, FaTint, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import HeroSection from '../Components/HomeComponents/HeroSection';
import FeaturesSection from '../Components/HomeComponents/FeaturesSection';
import CTASection from '../Components/HomeComponents/CTASection';
import ProcessSection from '../Components/HomeComponents/ProcessSection';
import StatsSection from '../Components/HomeComponents/StatsSection';
import TestimonialsSection from '../Components/HomeSharedComponents/TestimonialsSection';
import EventsSection from '../Components/HomeComponents/EventsSection';
// import NewsSection from '../Components/HomeComponents/NewsSection';


function Home() {
  return (
    <>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <ProcessSection />
        <EventsSection />
    </>
  )
}

export default Home


