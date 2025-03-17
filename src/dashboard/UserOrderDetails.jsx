import React, { useEffect, useState } from 'react'
import './dashboardCss/userOrderDetails.css'
import { IoArrowBackOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Messagify from '../components/Messagify';
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa6";
import { LiaSpinnerSolid } from "react-icons/lia";

const UserOrderDetails = () => {

    const navigate = useNavigate()
    const {orderId} = useParams()
    const [oneOrder, setOneOrder] = useState({})
    const [loading, setLoading] = useState(false)
    const [updateStatusLoading, setUdateStatusLoading] = useState(false)
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
        const getOneOrder = async ()=>{
            try{
                setLoading(true)
                const response = await axios.get(`https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-oneOrder/${orderId}`)
                setLoading(false)
                console.log(response)
                setOneOrder(response.data.oneOrder)

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

        getOneOrder()
    },[])

    const updateStatus = async (status)=>{
       try{
            setUdateStatusLoading(status)
            const url = `https://reborn-necessary-clothing-backend.onrender.com/api/products/update-status/${orderId}`
            const body = {status: status}
            const response = await axios.patch(url,body)
            setUdateStatusLoading(false)
            console.log(response)
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "success", value: response.data.message}))
            navigate("/manage-orders")

       }catch(error){
        setUdateStatusLoading(false)
        console.log(error)
        if(error.message == "Network Error"){
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"}))
        }else if(error.response?.data?.message == "jwt expired"){
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "error", value: "Your session has expired. Please log in again."}))
            navigate("/login")
        }
       }
    }

  return (
    <>
        {
            message == null ? null : <Messagify type={message.type} message={message.value}/>
        }
        <div className='user_order_details_body'>
            <article className='user_order_details_container'>
                <div className='user_order_details_top'>
                    <div className='user_order_details_top_left'>
                        <IoArrowBackOutline className='user_order_details_top_left_icon' onClick={()=>navigate("/manage-orders")}/>
                        <p>Order | <span>{oneOrder._id}</span></p>
                    </div>
                    <div className='user_order_details_top_right'>
                        <button>{oneOrder.status}</button>
                    </div>
                </div>
                <div className='user_order_details_bottom'>
                    {
                        loading ? 
                            <div className='user_order_details_items_loading'>
                                <div className='user_order_details_items_loading_item'></div>
                            </div>
                        :
                            oneOrder?.items?.map((e)=>(
                                <div className='user_order_details_bottom_item'>
                                    <div className='user_order_details_bottom_item_product'>
                                        <div className='user_order_details_bottom_item_product_image'>
                                            <img src={e.productImage} alt=''/>
                                        </div>
                                        <div className='user_order_details_bottom_item_product_details'>
                                            <h3>{e.productName}</h3>
                                            <div className='user_order_details_bottom_item_product_details_size'>
                                                <p>Size: {e.size}</p>
                                                <p>Qty: {e.qty}</p>
                                            </div>
                                            <p>${e.unitPrice}</p>
                                        </div>
                                    </div>
                                </div>
                        ))
                    }
                    <div className='user_order_details_payment_delivery_details'>
                        <div className='user_order_details_payment_delivery_details_item_container'>
                            <div className='user_order_details_payment_delivery_details_item_container_top'>
                                <h2>PAYMENT INFORMATION</h2>
                            </div>
                            {
                                loading ? 
                                    <div className='user_order_details_items_loading'>
                                        <div className='user_order_details_items_loading_item'></div>
                                    </div>
                                :
                                    <div className='user_order_details_payment_delivery_details_item_container_bottom'>
                                        <div className='user_order_details_payment_delivery_details_item_container_bottom_item'>
                                            <h3>Payment Method</h3>
                                            <p>{oneOrder.paymentMethod}</p>
                                        </div>
                                        <div className='user_order_details_payment_delivery_details_item_container_bottom_item'>
                                            <h3>Payment Details</h3>
                                            <p>Items total: ${oneOrder.subTotal}</p>
                                            <p>Delivery Fees: $20</p>
                                            <p>Total: ${oneOrder.totalAmount}</p>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className='user_order_details_payment_delivery_details_item_container'>
                            <div className='user_order_details_payment_delivery_details_item_container_top'>
                                <h2>DELIVERY INFORMATION</h2>
                            </div>
                            {
                                loading ? 
                                    <div className='user_order_details_items_loading'>
                                        <div className='user_order_details_items_loading_item'></div>
                                    </div>
                                :
                                    <div className='user_order_details_payment_delivery_details_item_container_bottom'>
                                        <div className='user_order_details_payment_delivery_details_item_container_bottom_item'>
                                            <h3>Delivery Method</h3>
                                            <p>Deliver to Customer Address</p>
                                        </div>
                                        <div className='user_order_details_payment_delivery_details_item_container_bottom_item'>
                                            <h3>Address</h3>
                                            <p>{oneOrder?.deliveryDetails?.[0]?.address || "No address provided"}</p>
                                        </div>
                                        <div className='user_order_details_payment_delivery_details_item_container_bottom_item'>
                                            <h3>Name</h3>
                                            <p>{oneOrder?.deliveryDetails?.[0]?.firstName || "No address provided"} {oneOrder?.deliveryDetails?.[0]?.lastName || "No address provided"}</p>
                                        </div>
                                        <div className='user_order_details_payment_delivery_details_item_container_bottom_item'>
                                            <h3>Phone number</h3>
                                            <p>{oneOrder?.deliveryDetails?.[0]?.phoneNumber || "No address provided"} | {oneOrder?.deliveryDetails?.[0]?.addPhoneNumber || "No address provided"}</p>
                                        </div>
                                        <div className='user_order_details_payment_delivery_details_item_container_bottom_item'>
                                            <h3>Additional Information</h3>
                                            <p>{oneOrder?.deliveryDetails?.[0]?.addInformation == "" ? "no additional information" : oneOrder?.deliveryDetails?.[0]?.addInformation || "No address provided"}</p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='order_details_update_status_body'>
                        <button
                            style={oneOrder.status == "Confirmed" || oneOrder.status == "Approved" || oneOrder.status == "Shipped" || oneOrder.status == "Delivered" ? {backgroundColor: "green"} : {backgroundColor: "rgb(231, 231, 231)"}}
                            disabled = {oneOrder.status == "Confirmed" || oneOrder.status == "Approved" || oneOrder.status == "Shipped" || oneOrder.status == "Delivered"}
                            onClick={()=>updateStatus("Confirmed")}>
                            {
                                updateStatusLoading == "Confirmed" ? 
                                    <LiaSpinnerSolid className="user_details_spinner"/>
                                :
                                    <>
                                        {
                                        oneOrder.status == "Confirmed" || oneOrder.status == "Approved" || oneOrder.status == "Shipped" || oneOrder.status == "Delivered" ? 
                                            <IoCheckmarkSharp/>
                                        :
                                            <FaRegCircle/>
                                        }
                                        Confirmed
                                    </>
                            }
                        </button>
                        <button 
                            style={oneOrder.status == "Confirmed" ? {backgroundColor: "#1D293A"} : {backgroundColor: "green"}} 
                            disabled = {oneOrder.status == "Approved" || oneOrder.status == "Shipped" || oneOrder.status == "Delivered"}
                            onClick={()=>updateStatus("Approved")}>
                            {
                                updateStatusLoading == "Approved" ? 
                                    <LiaSpinnerSolid className="user_details_spinner"/>
                                :
                                    <>
                                        {
                                            oneOrder.status == "Approved" || oneOrder.status == "Shipped" || oneOrder.status == "Delivered" ?
                                                <IoCheckmarkSharp/>
                                            :
                                                <FaRegCircle/>
                                        }
                                        Approved
                                    </>
                            }
                        </button>
                        <button
                            style={oneOrder.status == "Confirmed" ? {backgroundColor: "rgb(231, 231, 231)"} : oneOrder.status == "Approved" ? {backgroundColor: "#1D293A"} : {backgroundColor: "green"}}
                            disabled = {oneOrder.status == "Confirmed" || oneOrder.status == "Shipped" || oneOrder.status == "Delivered"}
                            onClick={()=>updateStatus("Shipped")}>
                            {
                                updateStatusLoading == "Shipped" ? 
                                    <LiaSpinnerSolid className="user_details_spinner"/>
                                :
                                    <>
                                        {
                                            oneOrder.status == "Shipped" || oneOrder.status == "Delivered" ?
                                                <IoCheckmarkSharp/>
                                            :
                                                <FaRegCircle/>
                                        }
                                        Shipped
                                    </>
                            }
                        </button>
                        <button
                            style={oneOrder.status == "Confirmed" || oneOrder.status == "Approved" ? {backgroundColor: "rgb(231, 231, 231)"} : oneOrder.status == "Shipped" ? {backgroundColor: "#1D293A"} : {backgroundColor: "green"}}
                            disabled = {oneOrder.status == "Confirmed" || oneOrder.status == "Approved" || oneOrder.status == "Delivered"} 
                            onClick={()=>updateStatus("Delivered")}>
                            {
                                updateStatusLoading == "Delivered" ? 
                                    <LiaSpinnerSolid className="user_details_spinner"/>
                                :
                                    <>
                                        {
                                            oneOrder.status == "Delivered" ?
                                                <IoCheckmarkSharp/>
                                            :
                                                <FaRegCircle/>
                                        }
                                        Delivered
                                    </>
                            }
                        </button>
                    </div>
                </div>
            </article>
        </div>
    </>
  )
}

export default UserOrderDetails