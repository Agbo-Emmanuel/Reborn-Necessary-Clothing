import React, { useEffect, useState } from 'react'
import './pagesCss/checkout.css'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LiaSpinnerSolid } from "react-icons/lia";
import Messagify from '../components/Messagify';

const Checkout = () => {

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

    const {orderId} = useParams();
    const [address, setAddress] = useState([])
    const [viewAddress, setViewAddress] = useState(false)
    const [selectDelivery, setSelectDelivery] = useState(false)
    const [openDeliveryOption, setOpenDeliveryOption] = useState(false)
    const [viewDeliveryOption, setViewDeliveryOption] = useState(false)
    const [viewPaymentMethodOption, setViewPaymentMethodOption] = useState(false)
    const [viewPaymentMethod, setViewPaymentMethod] = useState(false)
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(true)
    const [selectTransfer, setSelectTransfer] = useState(false)
    const [selectCard, setSelectCard] = useState(false)
    const [selectOnDelivery, setSelectOnDelivery] = useState(true)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Pay on Delivery")
    const [checkoutOrder, setCheckoutOrder] = useState({})
    const [deliverTo, setDeliverTo]= useState("")
    const [deliveryDetails, setDeliveryDetails] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        addPhoneNumber: "",
        address: "",
        addInformation: "",
    })
    const [confirmOrderLoading, setConfirmOrderLoading] = useState(false)

    const deliveryDetailInputChange = (e)=>{
        const {name, value} = e.target
        setDeliveryDetails({...deliveryDetails, [name]: value})
    }

    useEffect(()=>{
        address.length == 0 ? setViewAddress(false) : setViewAddress(true)
    },[address])

    const saveAddress = ()=>{
        setViewAddress(true)
    }

    useEffect(()=>{
        if(viewAddress == true){
            setOpenDeliveryOption(true)
        }else{
            setOpenDeliveryOption(false)
            setViewPaymentMethodOption(false)
        }
        viewDeliveryOption == true ? setViewPaymentMethodOption(true) : setViewPaymentMethodOption(false)
    },[viewAddress,viewDeliveryOption])

    // useEffect(()=>{
    //     viewDeliveryOption == true ? setViewPaymentMethodOption(true) : setViewPaymentMethodOption(false)
    // },[viewDeliveryOption])

    const selectDeliveryOption = (dev)=>{
        setSelectDelivery(!selectDelivery)
        setDeliverTo("Deliver to Customer Address")
    }

    const selectPaymentMethodNow = (method)=>{
        setSelectedPaymentMethod(method)
        if(method == "Pay on Delivery"){
            setSelectOnDelivery(true)
            setSelectCard(false)
            setSelectTransfer(false)
            setSelectPaymentMethod(true)
        }else if (method == "Pay with Card"){
            setSelectCard(true)
            setSelectTransfer(false)
            setSelectOnDelivery(false)
            setSelectPaymentMethod(true)
        }else if(method == "Pay with Bank Transfer"){
            setSelectTransfer(true)
            setSelectCard(false)
            setSelectOnDelivery(false)
            setSelectPaymentMethod(true)
        }
    }

    useEffect(()=>{
        const getCheckoutOrder = async ()=>{
            console.log(orderId)
            const url = `https://reborn-necessary-clothing-backend.onrender.com/api/products/get-checkout-order/${orderId}`
            try{
                const response = await axios.get(url)
                console.log(response)
                setCheckoutOrder(response.data.checkOrder)
            }catch(error){
                console.log(error)
                setShowMessage(!showMessage)
                error.message == "Network Error" ? 
                localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"})) : null
            }
        }

        getCheckoutOrder()
    },[])

    const confirmOrder = async ()=>{
        try{
            setConfirmOrderLoading(true)
            const url = `https://reborn-necessary-clothing-backend.onrender.com/api/products/confirm-order/${orderId}`
            const body = { deliveryDetails: deliveryDetails, deliverTo: deliverTo, paymentMethod: selectedPaymentMethod }
            const response = await axios.patch(url,body) 
            setConfirmOrderLoading(false)
            console.log(response)
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "success", value: response.data.message}))
            navigate("/")

        }catch(error){
            setConfirmOrderLoading(false)
            console.log(error)
            setShowMessage(!showMessage)
            error.message == "Network Error" ? 
            localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"})) : null
        }
    }


  return (
    <>
        {
            message == null ? null : <Messagify type={message.type} message={message.value}/>
        }
        <main className='checkout_body'>
            <section className='checkout_details_section'>
                <article className='checkout_address_body'>
                    <div className='checkout_address_top'>
                        <div className='checkout_address_top_left'>
                            <IoIosCheckmarkCircle className='checkout_tick_icon' color={viewAddress == true ? "green" : "lightgrey"}/>
                            <h3>1. CUSTOMER ADDRESS</h3>
                        </div>
                        {
                            viewAddress == true ? 
                                <div className='checkout_address_top_right' onClick={()=>setViewAddress(false)}>
                                    <p>Change</p>
                                    <MdKeyboardArrowRight className='checkout_arrow_icon'/>
                                </div>
                            : null
                        }
                    </div>
                    {
                        viewAddress == false ?
                            <div className='checkout_address_details_container'>
                                <div className='checkout_address_details_input_container'>
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        name='firstName'
                                        value={deliveryDetails.firstName}
                                        onChange={(e)=>deliveryDetailInputChange(e)}
                                    />
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        name='lastName'
                                        value={deliveryDetails.lastName}
                                        onChange={(e)=>deliveryDetailInputChange(e)}
                                    />
                                </div>
                                <div className='checkout_address_details_input_container'>
                                    <input
                                        type='text'
                                        placeholder='Phone Number'
                                        name='phoneNumber'
                                        value={deliveryDetails.phoneNumber}
                                        onChange={(e)=>deliveryDetailInputChange(e)}
                                    />
                                    <input
                                        type='text'
                                        placeholder='Additional Phone Number'
                                        name='addPhoneNumber'
                                        value={deliveryDetails.addPhoneNumber}
                                        onChange={(e)=>deliveryDetailInputChange(e)}
                                    />
                                </div>
                                <div className='checkout_address_details_input_container'>
                                    <input
                                        type='text'
                                        placeholder='Delivery Address'
                                        name='address'
                                        value={deliveryDetails.address}
                                        onChange={(e)=>deliveryDetailInputChange(e)}
                                    />
                                </div>
                                <div className='checkout_address_details_input_container'>
                                    <input
                                        type='text'
                                        placeholder='Additional Information(optional)'
                                        name='addInformation'
                                        value={deliveryDetails.addInformation}
                                        onChange={(e)=>deliveryDetailInputChange(e)}
                                    />
                                </div>
                            </div>
                        :
                            <div className='checkout_filled_address_details_container'>
                                <h4>{deliveryDetails.firstName} {deliveryDetails.lastName}</h4>
                                <p>{deliveryDetails.address} | {deliveryDetails.phoneNumber}</p>
                            </div>

                    }
                    {
                        viewAddress == true ? null :
                            <div className='checkout_address_details_button_container'>
                                <button>Cancel</button>
                                <button onClick={saveAddress}>Save</button>
                            </div>
                    }
                </article>
                <article className='checkout_address_body'>
                    <div className='checkout_address_top'>
                        <div className='checkout_address_top_left'>
                            <IoIosCheckmarkCircle className='checkout_tick_icon' color={viewDeliveryOption == true ? "green" : "lightgrey"}/>
                            <h3>2. DELIVERY DETAILS</h3>
                        </div>
                        {
                            viewDeliveryOption == true ?
                                <div className='checkout_address_top_right' onClick={()=>setViewDeliveryOption(false)}>
                                    <p>Change</p>
                                    <MdKeyboardArrowRight className='checkout_arrow_icon'/>
                                </div>
                            : null
                        }
                        
                    </div>
                    {
                        openDeliveryOption == true ?
                            <>
                                {
                                    viewDeliveryOption == false ? 
                                        <div className='checkout_delivery_details_container'>
                                            <div className='checkout_delivery_details_select_container'>
                                                <div className='checkout_delivery_details_select_option_container' onClick={selectDeliveryOption}>
                                                    <input type='radio' checked = {selectDelivery}/>
                                                    <h3>Deliver to Customer Address</h3>
                                                </div>
                                            </div>
                                        </div>
                                    : 
                                        <div className='checkout_filled_address_details_container'>
                                            <h4>Delivery to Customer Address</h4>
                                        </div>
                                }
                                {
                                    viewDeliveryOption == true ? null :
                                        <div className='delivery_details_confirm_btn_container'>
                                            <button onClick={()=>setViewDeliveryOption(true)} disabled = {selectDelivery == true ? false : true} style={selectDelivery == true ? {backgroundColor: "#000", color: "#fff"} : null}>Confirm details</button>
                                        </div>
                                }
                            </>
                        : null
                    }
                    
                </article>
                <article className='checkout_address_body'>
                    <div className='checkout_address_top'>
                        <div className='checkout_address_top_left'>
                            <IoIosCheckmarkCircle className='checkout_tick_icon' color={viewPaymentMethod == true ? "green" : "lightgrey"}/>
                            <h3>3. PAYMENT METHOD</h3>
                        </div>
                        {
                            viewPaymentMethod == true ?
                                <div className='checkout_address_top_right' onClick={()=>setViewPaymentMethod(false)}>
                                    <p>Change</p>
                                    <MdKeyboardArrowRight className='checkout_arrow_icon'/>
                                </div>
                            : null
                        } 
                    </div>
                    {
                        viewPaymentMethodOption == true ?
                            <>
                            
                                {
                                    viewPaymentMethod == false ?
                                        <div className='checkout_delivery_details_container'>
                                            <div className='checkout_delivery_details_select_container'>
                                                <div className='checkout_delivery_details_select_option_container' onClick={()=>selectPaymentMethodNow("Pay on Delivery")}>
                                                    <input type='radio' checked = {selectOnDelivery}/>
                                                    <h3>Pay on delivery</h3>
                                                </div>
                                                <div className='checkout_delivery_details_select_option_container' onClick={()=>selectPaymentMethodNow("Pay with Card")}>
                                                    <input type='radio' checked = {selectCard}/>
                                                    <h3>Pay with Card</h3>
                                                </div>
                                                <div className='checkout_delivery_details_select_option_container' onClick={()=>selectPaymentMethodNow("Pay with Bank Transfer")}>
                                                    <input type='radio' checked = {selectTransfer}/>
                                                    <h3>Pay with Bank Transfer</h3>
                                                </div>
                                            </div>
                                        </div>
                                    : 
                                        <div className='checkout_filled_address_details_container'>
                                            <h4>{selectedPaymentMethod}</h4>
                                        </div>
                                }
                                {
                                    viewPaymentMethod == true ? null :
                                        <div className='delivery_details_confirm_btn_container'>
                                            <button onClick={()=>setViewPaymentMethod(true)} disabled = {selectPaymentMethod == true ? false : true} style={selectPaymentMethod == true ? {backgroundColor: "#000", color: "#fff"} : null}>Confirm payment method</button>
                                        </div>
                                }
                            </> 
                        : null
                    }
                </article>
            </section>
            <section className='checkout_confirm_order_section'>
                <article className='checkout_details_container'>
                    <p>Subtotal</p>
                    <p>${checkoutOrder?.subTotal}</p>
                </article>
                <article className='checkout_details_container'>
                    <p>Shipping free</p>
                    {/* <p>$0</p> */}
                </article>
                <article className='checkout_details_container'>
                    <p>TOTAL</p>
                    <p>${checkoutOrder?.totalAmount}</p>
                </article>
                <button
                    onClick={confirmOrder} 
                    disabled = {viewAddress == true && viewDeliveryOption == true && viewPaymentMethod == true ? false : true}
                    style={viewAddress == true && viewDeliveryOption == true && viewPaymentMethod == true ? {backgroundColor: "#000"} : {backgroundColor: "lightgrey"}}
                >{confirmOrderLoading ? <LiaSpinnerSolid className='checkoutSpinner'/> : "Confirm Order"}</button>
            </section>
        </main>
    </>
  )
}

export default Checkout