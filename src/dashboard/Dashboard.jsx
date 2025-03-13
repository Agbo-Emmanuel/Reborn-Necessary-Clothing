import React, { useEffect, useState } from 'react'
import './dashboardCss/dashboard.css'
import { MdSell, MdAttachMoney, MdGroups, MdKeyboardArrowDown  } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import OrderList from '../components/OrderList';
import Messagify from '../components/Messagify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate()

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

  const [adminDetails, setAdminDetails] = useState()

  useEffect(()=>{
    const getAdminDetails = async ()=>{
      try{
        const response = await axios.get("https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-admin-details")
        console.log(response)
        setAdminDetails(response.data)
      }catch(error){
        console.log(error);
      }
    }

    getAdminDetails()
  },[])

  return (
    <>
      {
        message == null ? null : <Messagify type={message.type} message={message.value}/>
      }
      <main className='dashboard_body'>
        <section className='dashboard_details_body'>
          <article className='dashboard_details_card'>
            <div className='dashboard_details_icon_container'>
              <MdSell/>
            </div>
            <div className='dashboard_details_text_container'>
              <p>Total Sales</p>
              <h3>100</h3>
            </div>
          </article>
          <article className='dashboard_details_card'>
            <div className='dashboard_details_icon_container'>
              <MdAttachMoney/>
            </div>
            <div className='dashboard_details_text_container'>
              <p>Total Income</p>
              <h3>$37,432</h3>
            </div>
          </article>
          <article className='dashboard_details_card'>
            <div className='dashboard_details_icon_container'>
              <AiOutlineCheckCircle />
            </div>
            <div className='dashboard_details_text_container'>
              <p>Orders Paid</p>
              <h3>100</h3>
            </div>
          </article>
          <article className='dashboard_details_card'>
            <div className='dashboard_details_icon_container'>
              <MdGroups  />
            </div>
            <div className='dashboard_details_text_container'>
              <p>Total Users</p>
              <h3>{adminDetails?.totalUsers}</h3>
            </div>
          </article>
        </section>
        <section className='dashboard_recent_orders_section'>
          <article className='dashboard_recent_orders_top'>
            <h3>Recent orders</h3>
            <p onClick={()=>navigate("/manage-orders")}>View all <MdKeyboardArrowDown size={18}/></p>
          </article>
          <article className='dashboard_recent_orders_body'>
            <OrderList/>
          </article>
        </section>
      </main>
    </>
  )
}

export default Dashboard