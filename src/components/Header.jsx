import React from 'react'
import './componentCss/header.css'
import rbnc_logo from '../assets/rbnc_logo.png'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";

const Header = () => {
  return (
    <>
      <div className='header_body'>
        <div className='header_logo_container'>
          <img src={rbnc_logo} alt=''/>
        </div>
        <div className='header_nav_container'>
          <Link className='header_nav'>Designer Mood</Link>
          <Link className='header_nav'>For Her</Link>
          <Link className='header_nav'>For Him</Link>
          <Link className='header_nav'>Accessories</Link>
        </div>
        <div className='header_account_container'>
          <IoSearchOutline cursor="pointer"/>
          <MdOutlineShoppingBag cursor="pointer"/>
        </div>
      </div>
    </>
  )
}

export default Header