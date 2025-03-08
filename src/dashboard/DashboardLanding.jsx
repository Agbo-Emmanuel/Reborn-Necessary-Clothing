import React from 'react'
import './dashboardCss/dashboardLanding.css'
import rbnc_logo_white from '../assets/rbnc_logo_white.png'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { MdDashboard, MdLogout, MdManageSearch } from "react-icons/md";
import { FaUserCog, FaUserCircle } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";

const DashboardLanding = () => {

    const navigate = useNavigate()

  return (
    <>
        <main className='dashboard_landing_body'>
            <section className='dashboard_landing_menu_container'>
                <article className='dashboard_landing_logo_container'>
                    <img src={rbnc_logo_white} alt='logo'/>
                </article>
                <article className='dashboard_landing_menu_items_container'>
                    <NavLink to='/dashboard' className={({isActive})=> isActive ? "dashboard_menu_active" : "dashboard_menu_notactive"}>
                        <MdDashboard/>
                        Dashboard
                    </NavLink>
                    <NavLink to='/manage-products' className={({isActive})=> isActive ? "dashboard_menu_active" : "dashboard_menu_notactive"}>
                        <MdManageSearch/>
                        Product
                    </NavLink>
                    <NavLink to='/add-product' className={({isActive})=> isActive ? "dashboard_menu_active" : "dashboard_menu_notactive"}>
                        <IoAddCircleOutline/>
                        Add Product
                    </NavLink>
                    <NavLink to='/manage-orders' className={({isActive})=> isActive ? "dashboard_menu_active" : "dashboard_menu_notactive"}>
                        <BiPackage/>
                        Orders
                    </NavLink>
                    <NavLink to='/manage-users' className={({isActive})=> isActive ? "dashboard_menu_active" : "dashboard_menu_notactive"}>
                        <FaUserCog/>
                        User
                    </NavLink>
                    <div className='dashboard_landing_menu_logout_container'>
                        <MdLogout/>
                        Logout
                    </div>
                </article>
            </section>
            <section className='dashboard_landing_mainPage_container'>
                <article className='dashboard_landing_header_container'>
                    <div className='dashboard_landing_header_left_container'>
                        <button onClick={()=>navigate("add-product")}>+ Add New Product</button>
                    </div>
                    <div className='dashboard_landing_header_right_container'>
                        <div className='dashboard_landing_header_profile_container'>
                            <div className='dashboard_landing_header_profile_image_container'>
                                <FaUserCircle/>
                            </div>
                            <h4>Admin</h4>
                        </div>
                    </div>
                </article>
                <article className='dashboard_landing_main_page_body'>
                    <Outlet/>
                </article>
            </section>
        </main>
    </>
  )
}

export default DashboardLanding