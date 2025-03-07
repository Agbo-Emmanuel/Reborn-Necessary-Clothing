import React, { useEffect, useState } from 'react'
import './pagesCss/orders.css'
import OngoingDeliveredOrder from '../components/OngoingDeliveredOrder'
import CanceledReturnedOrder from '../components/CanceledReturnedOrder'
import { IoMdArrowBack } from "react-icons/io";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Messagify from '../components/Messagify';

const Orders = () => {

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

    const [onOrder, setOnOrder] = useState(true)
    const [order, setOrder] = useState([])

    useEffect(()=>{
        const getOrder = async ()=>{
            try{
                const url = "https://reborn-necessary-clothing-backend.onrender.com/api/products/get-order"
                const token = localStorage.getItem('token');
                const theHeaders = {
                  headers: {
                    'Authorization': `Bearer ${token}`
                    }
                }
                const response = await axios.get(url,theHeaders)
                console.log(response)
                setOrder(response.data.order)
            }catch(error){
                console.log(error)
                setShowMessage(!showMessage)
                error.message == "Network Error" ? 
                localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"})) : null
            }
        }

        getOrder()
    },[])

  return (
    <>
        {
            message == null ? null : <Messagify type={message.type} message={message.value}/>
        }
        <main className='orders_body'>
            <section className='orders_top_section'>
                <div className='orders_top_item' onClick={()=>navigate("/account")}>
                    <IoMdArrowBack className='orders_top_icon'/>
                    <h3>Orders</h3>
                </div>
            </section>
            <section className='orders_detail_section'>
                <article className='orders_detail_top'>
                    <p onClick={()=>setOnOrder(true)} style={onOrder == true ? {borderBottomColor: "#40BFFF", borderBottomWidth: "2px", borderBottomStyle: "solid", color: "#40BFFF"} : {border : "none"}}>ONGOING/DELIVERED(0)</p>
                    <p onClick={()=>setOnOrder(false)} style={onOrder == false ? {borderBottomColor: "#40BFFF", borderBottomWidth: "2px", borderBottomStyle: "solid", color: "#40BFFF"} : {border : "none"}}>CANCELED/RETURNED(0)</p>
                </article>
                <article className='orders_detail_item_container'>
                    {
                        onOrder == true ?  <OngoingDeliveredOrder theOrder = {order}/> : <CanceledReturnedOrder theOrder = {order}/>
                    }
                </article>
            </section>
        </main>
    </>
  )
}

export default Orders