import React, { useEffect, useState } from 'react'
import './dashboardCss/manageOrders.css'
import OrderList from '../components/OrderList'
import { useNavigate } from 'react-router-dom'
import Messagify from '../components/Messagify'
import axios from 'axios'

const ManageOrders = () => {

  const navigate = useNavigate()
  const [allOrders, setAllOrders] = useState([])
  const [loading, setLoading] = useState(false)
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
        const getAllOrders = async ()=>{
          try{
            setLoading(true)
            const response = await axios.get("https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-allOrders")
            setLoading(false)
            console.log(response)
            setAllOrders(response.data.allOrders)
      
          }catch(error){
            setLoading(false)
            console.log(error)
            if(error.message == "Network Error"){
              setShowMessage(!showMessage)
              localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"}))
            }else if(error.response?.data?.message == "jwt expired" ){
              setShowMessage(!showMessage)
              localStorage.setItem("message", JSON.stringify({type: "error", value: "Your session has expired. Please log in again."}))
              navigate("/login")
          }
          }
        }
    
        getAllOrders()
      },[])

  return (
    <>
      {
        message == null ? null : <Messagify type={message.type} message={message.value}/>
      }
      <div className='manage_orders_body'>
        <h3>Orders:</h3>
        <div className='order_list_container'>
          <OrderList allOrders = {allOrders} loading={loading}/>
        </div>
      </div>
    </>
  )
}

export default ManageOrders