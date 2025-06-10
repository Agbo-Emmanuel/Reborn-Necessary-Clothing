import React, { useEffect, useState } from 'react'
import './componentCss/header.css'
import rbnc_logo_white from '../assets/rbnc_logo_white.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoSearchOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaUserLarge, FaRegUser } from "react-icons/fa6";
import { BiPackage } from "react-icons/bi";
import axios from 'axios';

const Header = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [showAccntMenu, setShowAccntMenu] = useState(false)
  const [userActive, setUserActive] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { cart: [] })
  const [cartLength, setCartLength] = useState(0)

    useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || { cart: [] });
    };

    window.addEventListener("storage", updateUser); // Listen for storage changes

    return () => window.removeEventListener("storage", updateUser); // Cleanup event listener
  }, []);


  // useEffect(()=>{
  //   const getCartLength = async ()=>{
  //     try{
  //       const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-cart"
  //       const token = localStorage.getItem('token');
  //       const theHeaders = {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //           }
  //       }
  //       const response = await axios.get(url,theHeaders)
  //       console.log(response)
  //       setCartLength(response.data.cart.length)
  //   }catch(error){
  //       console.log(error)
  //   }
  //   }

  //   getCartLength()
  // },[])

  const activeToken = localStorage.getItem("token")

  useEffect(()=>{
    activeToken ? setUserActive(true) : setUserActive(false)
  },[activeToken])

  const gotToAccount = ()=>{
    activeToken ? navigate("/account") : navigate("/login")
    setShowAccntMenu(false)
    setShowMenu(false)
  }
  const goToOrders = ()=>{
    activeToken ? navigate("/orders") : navigate("/login")
    setShowAccntMenu(false)
    setShowMenu(false)
  }

  const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setShowAccntMenu(false)
    navigate("/login")
  }

  return (
    <>
      <div className='header_body'>
        <div onClick={()=>navigate("/")} className='header_logo_container'>
          <img src={rbnc_logo_white} alt=''/>
        </div>
        <div className='header_nav_container'>
          <Link to='/designer-mood' className='header_nav'>Designer Mood</Link>
          <Link to="/product-category/women" className='header_nav'>For Her</Link>
          <Link to='/product-category/men' className='header_nav'>For Him</Link>
          <Link className='header_nav'>Accessories</Link>
        </div>
        <div className='header_account_container'>
          <IoSearchOutline cursor="pointer"/>
          <div className='cart_icon_container' onClick={()=>navigate("/cart")}>
            {
              user.cart.length == 0 ? null : <p>{user.cart.length}</p>
            }
            <MdOutlineShoppingBag className='cart_icon showCart' cursor="pointer"/>
          </div>
          <FaUserLarge className='cart_icon' cursor="pointer" onClick={()=>setShowAccntMenu(!showAccntMenu)}/>
          {
            showAccntMenu == true ? 
              <div className='account_selection_container'>
                {
                  userActive == true ? null : <button onClick={()=>navigate("/login")}>Sign In</button>
                }
                <div className='account_selection_link' onClick={gotToAccount}> <FaRegUser className='asl_icon'/> My Account</div>
                <div className='account_selection_link' onClick={goToOrders}> <BiPackage className='asl_icon'/> Orders</div>
                {
                  userActive == true ? <div className='account_selection_logout_link' onClick={logout}>Logout</div> : null
                }
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
          <Link onClick={()=>setShowMenu(false)} to="/product-category/women" className='mobile_header_nav'>For Her</Link>
          <Link onClick={()=>setShowMenu(false)}to='/product-category/men' className='mobile_header_nav'>For Him</Link>
          <Link onClick={()=>setShowMenu(false)} className='mobile_header_nav'>Accessories</Link>
          {/* <Link onClick={()=>setShowMenu(false)} to="/cart" className='mobile_header_nav'>Cart</Link> */}
          <div onClick={gotToAccount} to="/account" className='mobile_header_nav'>My Account</div>
          <div onClick={goToOrders} to="/orders" className='mobile_header_nav'>Orders</div>
          {
            userActive == true ? 
              <Link onClick={logout} className='mobile_header_nav'>Logout</Link>
            : 
              <Link onClick={()=>setShowMenu(false)} to="/login" className='mobile_header_nav'>Sign In</Link>
          }
        </div> 
      </div>
    </>
  )
}

export default Header