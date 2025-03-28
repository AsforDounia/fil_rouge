// import React from 'react';
// import { Head } from '@inertiajs/react';
// import Header from '@/Components/Myomponents/SharedComponents/Header';
// import Hero from '@/Components/Myomponents/HomeContaint/Hero';
// import StatsSection from '@/Components/Myomponents/HomeContaint/StatsSection';
// import FeaturesSection from '@/Components/Myomponents/HomeContaint/FeaturesSection';
// import TestimonialsSection from '@/Components/Myomponents/HomeContaint/TestimonialsSection';
// import ProcessSection from '@/Components/Myomponents/HomeContaint/ProcessSection';
// import CTASection from '@/Components/Myomponents/HomeContaint/CTASection';
// import Footer from '@/Components/Myomponents/SharedComponents/Footer';

// export default function Welcome() {
//   return (
//     <>
//       <Head title="Home" />
//       <Header />
//       <Hero />
//       <StatsSection />
//       <FeaturesSection />
//       <ProcessSection />
//       <TestimonialsSection />
//       <CTASection />
//       <Footer />
//     </>
//   );
// }

import React from "react";
import { Head } from "@inertiajs/react";
import Header from "@/Components/MyComponents/HomeComponents/Header";
import HeroSection from "@/Components/MyComponents/HomeComponents/HeroSection";
import StatsSection from "@/Components/MyComponents/HomeComponents/StatsSection";
import FeaturesSection from "@/Components/MyComponents/HomeComponents/FeaturesSection";
import TestimonialsSection from "@/Components/MyComponents/HomeComponents/TestimonialsSection";
import ProcessSection from "@/Components/MyComponents/HomeComponents/ProcessSection";
import CTASection from "@/Components/MyComponents/HomeComponents/CTASection";
import Footer from "@/Components/MyComponents/HomeComponents/Footer";


export default function Home() {
    return (
        <>
        <Head title="Home" />
        <Header />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ProcessSection />
        <CTASection />
        <Footer />
        </>
    );
}

