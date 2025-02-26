import React, { useEffect, useState } from 'react'
import './pagesCss/accountLanding.css'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa6";
import { BiPackage } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

const AccountLanding = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const [showDetails, setShowDetails] = useState(false);

    const logout = ()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {
        if (window.innerWidth <= 900) {
            setShowDetails(location.pathname == "/orders");
        }
    }, [location.pathname]);

  return (
    <>
        <main className='account_landing_body'>
            <section className='account_mobile_top_section'>
                <h5>Welcome, Agbo Emmanuel</h5>
                <p>agboe4102@gmail.com</p>
            </section>
            <section className='account_landing_routing_section'>
                <NavLink to="/account" className={({isActive})=> isActive ? "accountActive" : "accountNotActive"}><FaRegUser className='ar_icon ar_icon_mobile'/> My RBNC Account</NavLink>
                <NavLink to="/orders" className={({isActive})=> isActive ? "accountActive" : "accountNotActive"}><BiPackage className='ar_icon'/> Orders</NavLink>
                <div className='account_landing_logout' onClick={logout}><FiLogOut className='ar_icon'/> Logout</div>
            </section>
            <section className={`account_landing_details_body ${showDetails ? 'show' : ''}`}>
                <Outlet/>
            </section>
        </main>
    </>
  )
}

export default AccountLanding