import React from 'react'
import './pagesCss/landing.css'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <>
        <div className='landing_body'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    </>
  )
}

export default Landing