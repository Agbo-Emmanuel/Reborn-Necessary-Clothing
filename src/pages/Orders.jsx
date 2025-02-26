import React, { useState } from 'react'
import './pagesCss/orders.css'
import OngoingDeliveredOrder from '../components/OngoingDeliveredOrder'
import CanceledReturnedOrder from '../components/CanceledReturnedOrder'
import { IoMdArrowBack } from "react-icons/io";
import { Navigate, useNavigate } from 'react-router-dom';

const Orders = () => {

    const navigate = useNavigate()

    const [onOrder, setOnOrder] = useState(true)
    const [order, setOrder] = useState([])

  return (
    <>
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