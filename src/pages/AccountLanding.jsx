import React, { useEffect, useState } from 'react'
import './pagesCss/accountLanding.css'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa6";
import { BiPackage } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import axios from 'axios';
import Messagify from '../components/Messagify';

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

    const [user, setUser]= useState()
        const [showMessage, setShowMessage] = useState(false)
        const [message, setMessage] = useState(() => {
            const storedMessage = localStorage.getItem("message");
            return storedMessage ? JSON.parse(storedMessage) : null;
        });
                    
        useEffect(() => {
            const handleStorageChange = () => {
            const storedMessage = localStorage.getItem("message");
            if (storedMessage) {
                setMessage(JSON.parse(storedMessage));
            } else {
                setMessage(null);
            }
            };
                    
            setTimeout(() => {
            localStorage.removeItem("message");
            setMessage(null); // Clear the state
            }, 5000);
                    
            handleStorageChange()
        }, [showMessage]);
    
        useEffect(()=>{
            const getUser = async ()=>{
                try{
                    const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-user"
                    const token = localStorage.getItem('token');
                    const theHeaders = {
                      headers: {
                        'Authorization': `Bearer ${token}`
                        }
                    }
                    const response = await axios.get(url,theHeaders)
                    console.log(response)
                    setUser(response.data.user)
                }catch(error){
                    console.log(error)
                    setShowMessage(!showMessage)
                    error.message == "Network Error" ? 
                    localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"})) : null
                }
            }
    
            getUser()
        },[])
    

  return (
    <>
        {
            message == null ? null : <Messagify type={message.type} message={message.value}/>
        }
        <main className='account_landing_body'>
            <section className='account_mobile_top_section'>
                <h5>Welcome, {user?.fullName}</h5>
                <p>{user?.email}</p>
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