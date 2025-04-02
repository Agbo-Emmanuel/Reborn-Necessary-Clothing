import React, { useEffect, useRef } from 'react'
import './pagesCss/landing.css'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'

const Landing = () => {

  const { pathname } = useLocation();
  const landingRef = useRef(null);

  useEffect(() => {
    if (landingRef.current) {
      landingRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <>
      <div className='landing_body' ref={landingRef}>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  )
}

export default Landing