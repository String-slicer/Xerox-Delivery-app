import React, { useEffect } from 'react'
import MainNav from '../components/MainNav'
import HeroSection from '../components/HeroSection'
import KeyFeatures from '../components/KeyFeatures'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import WhyPrintify from '../components/WhyPrintify'
import {useRef} from 'react';
gsap.registerPlugin(ScrollTrigger)

export const MainLanding = () => {
  const ref = useRef(null);
  // useGSAP(() => {
  //   gsap.to(ref.current, {
  //     backgroundColor: "#f8f9fb",
  //     scrollTrigger: {
  //       trigger: ".features-section",
  //       start: "top 70%",
  //       end: "bottom 70%",
  //       scrub: true,
  //       // markers: true,
  //     },
  //   });
  // }, []);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#131C24] transition-colors duration-500 overflow-x-hidden font-sans">
      <MainNav  />
      <HeroSection />
      <div className="features-section bg-[#131c24]" ref={ref}>
        <KeyFeatures />
      </div>
      <WhyPrintify /> 
    </div>
  )
}
