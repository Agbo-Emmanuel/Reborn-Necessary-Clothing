import React, { useEffect, useState } from 'react'
import './pagesCss/orders.css'
import OngoingDeliveredOrder from '../components/OngoingDeliveredOrder'
import CanceledReturnedOrder from '../components/CanceledReturnedOrder'
import { IoMdArrowBack } from "react-icons/io";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Messagify from '../components/Messagify';
import { IoArrowBackOutline } from "react-icons/io5";

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
    const [showOneOrder, setShowOneOrder] = useState(false)
    const [oneOrderDetails, setOneOrderDetails] = useState([])
    const [orderLoading, setOrderLoading] = useState(false)

    useEffect(()=>{
        const getOrder = async ()=>{
            try{
                setOrderLoading(true)
                const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-order"
                const token = localStorage.getItem('token');
                const theHeaders = {
                  headers: {
                    'Authorization': `Bearer ${token}`
                    }
                }
                const response = await axios.get(url,theHeaders)
                setOrderLoading(false)
                console.log(response)
                setOrder(response.data.order)
            }catch(error){
                setOrderLoading(false)
                console.log(error)
                setShowMessage(!showMessage)
                error.message == "Network Error" ? 
                localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"})) : null
            }
        }

        getOrder()
    },[])

    const showDetails = (id)=>{
        const oneDetails = order.find(item => item._id == id)
        setOneOrderDetails(oneDetails)
        setShowOneOrder(true)
    }

    useEffect(() => {
        console.log(oneOrderDetails);
    }, [oneOrderDetails]);

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
                {/* <article className='orders_detail_top'>
                    <p onClick={()=>setOnOrder(true)} style={onOrder == true ? {borderBottomColor: "#40BFFF", borderBottomWidth: "2px", borderBottomStyle: "solid", color: "#40BFFF"} : {border : "none"}}>ONGOING/DELIVERED(0)</p>
                    <p onClick={()=>setOnOrder(false)} style={onOrder == false ? {borderBottomColor: "#40BFFF", borderBottomWidth: "2px", borderBottomStyle: "solid", color: "#40BFFF"} : {border : "none"}}>CANCELED/RETURNED(0)</p>
                </article>
                <article className='orders_detail_item_container'>
                    {
                        onOrder == true ?  <OngoingDeliveredOrder theOrder = {order}/> : <CanceledReturnedOrder theOrder = {order}/>
                    }
                </article> */}
                {
                    showOneOrder == false ? 
                        <article className='order_details_table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#orderId</th>
                                        <th>item</th>
                                        <th>status</th>
                                        <th>view details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderLoading ? <p className='order_loading'>retreiving orders...</p> :
                                        order.map((e)=>(
                                            <tr key={e._id}>
                                                <td>{e._id}</td>
                                                <td>{e.items.length}</td>
                                                <td style={{color: "#96beff"}}>{e.status}</td>
                                                <td>
                                                    <button className='view_order_details_btn' onClick={()=>showDetails(e._id)}>view details</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </article>
                    :
                        <article className='oneOrder_details_container'>
                            <div className='oneOrder_details_top'>
                                <div className='oneOrder_details_top_left'>
                                    <IoArrowBackOutline className='oneOrder_details_top_left_icon' onClick={()=>setShowOneOrder(false)}/>
                                    <p>Order | <span>{oneOrderDetails?._id}</span></p>
                                </div>
                                <div className='oneOrder_details_top_right'>
                                    <button>{oneOrderDetails?.status}</button>
                                </div>
                            </div>
                            <div className='oneOrder_details_bottom'>
                                {
                                    oneOrderDetails?.items.map((e)=>(
                                        <div key={e._id} className='oneOrder_details_bottom_item'>
                                            <div className='oneOrder_details_bottom_item_product'>
                                                <div className='oneOrder_details_bottom_item_product_image'>
                                                    <img src={e.productImage} alt=''/>
                                                </div>
                                                <div className='oneOrder_details_bottom_item_product_details'>
                                                    <h3>{e.productName}</h3>
                                                    <div className='oneOrder_details_bottom_item_product_details_size'>
                                                        <p>Size: {e.size}</p>
                                                        <p>Qty: {e.qty}</p>
                                                    </div>
                                                    <p>${e.unitPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className='oneOrder_details_payment_delivery_details'>
                                    <div className='oneOrder_details_payment_delivery_details_item_container'>
                                        <div className='oneOrder_details_payment_delivery_details_item_container_top'>
                                            <h2>PAYMENT INFORMATION</h2>
                                        </div>
                                        <div className='oneOrder_details_payment_delivery_details_item_container_bottom'>
                                            <div className='oneOrder_details_payment_delivery_details_item_container_bottom_item'>
                                                <h3>Payment Method</h3>
                                                <p>{oneOrderDetails?.paymentMethod}</p>
                                            </div>
                                            <div className='oneOrder_details_payment_delivery_details_item_container_bottom_item'>
                                                <h3>Payment Details</h3>
                                                <p>Items total: ${oneOrderDetails?.subTotal}</p>
                                                <p>Delivery Fees: $20</p>
                                                <p>Total: ${oneOrderDetails?.totalAmount}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='oneOrder_details_payment_delivery_details_item_container'>
                                        <div className='oneOrder_details_payment_delivery_details_item_container_top'>
                                            <h2>DELIVERY INFORMATION</h2>
                                        </div>
                                        <div className='oneOrder_details_payment_delivery_details_item_container_bottom'>
                                            <div className='oneOrder_details_payment_delivery_details_item_container_bottom_item'>
                                                <h3>Delivery Method</h3>
                                                <p>Deliver to Customer Address</p>
                                            </div>
                                            <div className='oneOrder_details_payment_delivery_details_item_container_bottom_item'>
                                                <h3>Address</h3>
                                                <p>{oneOrderDetails?.deliveryDetails[0].address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                }
            </section>
        </main>
    </>
  )
}

export default Orders