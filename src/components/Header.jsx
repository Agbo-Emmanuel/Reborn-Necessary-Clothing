import React, { useState } from 'react'
import './componentCss/header.css'
import rbnc_logo from '../assets/rbnc_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoSearchOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaUserLarge, FaRegUser } from "react-icons/fa6";
import { BiPackage } from "react-icons/bi";

const Header = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [showAccntMenu, setShowAccntMenu] = useState(false)

  return (
    <>
      <div className='header_body'>
        <div onClick={()=>navigate("/")} className='header_logo_container'>
          <img src={rbnc_logo} alt=''/>
        </div>
        <div className='header_nav_container'>
          <Link to='/designer-mood' className='header_nav'>Designer Mood</Link>
          <Link to="/product-category/For Her" className='header_nav'>For Her</Link>
          <Link className='header_nav'>For Him</Link>
          <Link className='header_nav'>Accessories</Link>
        </div>
        <div className='header_account_container'>
          <IoSearchOutline cursor="pointer"/>
          <MdOutlineShoppingBag className='cart_icon' cursor="pointer" onClick={()=>navigate("/cart")}/>
          <FaUserLarge className='cart_icon' cursor="pointer" onClick={()=>setShowAccntMenu(!showAccntMenu)}/>
          {
            showAccntMenu == true ? 
              <div className='account_selection_container'>
                <button>Sign In</button>
                <Link className='account_selection_link'> <FaRegUser className='asl_icon'/> My Account</Link>
                <Link className='account_selection_link'> <BiPackage className='asl_icon'/> Orders</Link>
              </div> : null
          }
          {
            showMenu == true ? 
              <IoClose onClick={()=>setShowMenu(false)} className='menu_icon' cursor="pointer"/> 
            : 
              <IoMenu onClick={()=>setShowMenu(true)} className='menu_icon' cursor="pointer"/>
          }
        </div>
        <div className={`mobile_menu_container ${showMenu ? 'expanded' : 'remove'}`}>
          <Link onClick={()=>setShowMenu(false)} to='/' className='mobile_header_nav'>Home</Link>
          <Link onClick={()=>setShowMenu(false)} to='/designer-mood' className='mobile_header_nav'>Designer Mood</Link>
          <Link onClick={()=>setShowMenu(false)} to="/product-category/For Her" className='mobile_header_nav'>For Her</Link>
          <Link onClick={()=>setShowMenu(false)} className='mobile_header_nav'>For Him</Link>
          <Link onClick={()=>setShowMenu(false)} className='mobile_header_nav'>Accessories</Link>
          <Link onClick={()=>setShowMenu(false)} to="/cart" className='mobile_header_nav'>Cart</Link>
          <Link onClick={()=>setShowMenu(false)} to="" className='mobile_header_nav'>Sign In</Link>
          <Link onClick={()=>setShowMenu(false)} to="" className='mobile_header_nav'>Orders</Link>
        </div> 
      </div>
    </>
  )
}

export default Header