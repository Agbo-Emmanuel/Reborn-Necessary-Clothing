import React, { useEffect, useState } from 'react'
import './pagesCss/detail.css'
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Messagify from '../components/Messagify';
import { LiaSpinnerSolid } from "react-icons/lia";

const Detail = () => {

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

    const {id} = useParams()
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [detail, setDetail] = useState()
    const [size, setSize] = useState("L")
    const [availableSize, setAvailableSize] = useState()
    const [qty, setQty] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getProduct = async ()=>{
            const url = `https://reborn-necessary-clothing-backend.onrender.com/api/products/get-one-product/${id}`
            try{
                const response = await axios.get(url)
                console.log(response)
                setDetail(response.data.product)

            }catch(error){
                console.log(error)
            }   
        }
        getProduct()
    },[])

    useEffect(()=>{
        size == "L" ? setAvailableSize(detail?.sizes.L):
        size == "M" ? setAvailableSize(detail?.sizes.M):
        size == "S" ? setAvailableSize(detail?.sizes.S):
        size == "XL" ? setAvailableSize(detail?.sizes.XL):
        size == "twoXL" ? setAvailableSize(detail?.sizes.twoXL):
        size == "threeXL" ? setAvailableSize(detail?.sizes.threeXL): 
        null
    },[size, detail])

    const increaseQty = () => {
        setQty(prevQty => (prevQty < availableSize ? prevQty + 1 : prevQty));
    };
    
    const decreaseQty = () => {
        setQty(prevQty => (prevQty > 0 ? prevQty - 1 : prevQty));
    };


    const addToCart = async ()=>{
        const token = localStorage.getItem('token');
        if (!token) {
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "error", value: "Please log in before adding items to your cart."}));
            return;
        }
        try{
            setLoading(true)
            const url = "https://reborn-necessary-clothing-backend.onrender.com/api/products/add-to-cart"
            const theHeaders = {
              headers: {
                'Authorization': `Bearer ${token}`
                }
            }
            const body = {productId: detail._id, qty: qty, size: size}

            const response = await axios.post(url, body, theHeaders)
            setUser(prevUser => ({
                ...prevUser,
                cart: response.data.cart
            }));
            localStorage.setItem("user", JSON.stringify({ ...user, cart: response.data.cart }));
            setLoading(false)
            console.log(response)
            navigate("/")
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "success", value: response.data.message}))

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
            }else{
                setShowMessage(!showMessage)
                localStorage.setItem("message", JSON.stringify({type: "error", value: error.response.data.message}))
            }
        }
    }


  return (
    <>
        {
            message == null ? null : <Messagify type={message.type} message={message.value}/>
        }
        <div className='detail_body'>
            <div className='detail_image_section'>
                <img src={detail?.image} alt='img'/>
            </div>
            <div className='detail_description_section'>
                <div className='detail_description_container'>
                    <h2>{detail?.productName}</h2>
                </div>
                <div className='detail_description_container'>
                    <h6>${detail?.price}</h6>
                    <div className='avail_container'>
                        <p>Availability:</p>
                        <p>In stock</p>
                    </div>
                    <div className='avail_container'>
                        <p>Category:</p>
                        <p>{detail?.category}</p>
                    </div>
                    <p>Free shipping</p>
                </div>
                <div className='detail_description_container'>
                    {/* <div className='avail_container'>
                        <p>Select Color:</p>
                        <div className='color_picker_container'>
                            {
                                colors.map((e)=>(
                                    <div 
                                        className='color_container'
                                        style={
                                            {
                                                backgroundColor: e.color
                                            }
                                        }
                                    ></div>  
                                ))
                            }
                        </div>
                    </div> */}
                    <div className='avail_container size_select'>
                        <p>Size:</p>
                        <select value={size} onChange={(e)=>setSize(e.target.value)}>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="S">S</option>
                            <option value="XL">XL</option>
                            <option value="twoXL">2XL</option>
                            <option value="threeXL">3XL</option>
                        </select>
                    </div>
                    <div className='avail_container size_select'>
                        <p>available:</p>
                        <p>{availableSize}</p>
                    </div>
                </div>
                <div className='detail_description_container'>
                    <div className='detail_description_container_last'>
                        <div className='quantity_container'>
                            <button onClick={decreaseQty}>-</button>
                            <p>{qty}</p>
                            <button onClick={increaseQty}>+</button>
                        </div>
                        <div className='add_to_cart_btn_container'>
                            <button onClick={addToCart}>
                                <IoCartOutline className='add_to_cart_icon'/>
                                {
                                    loading ? <LiaSpinnerSolid className='add_to_cart_spinner'/> : <p>Add To Cart</p>
                                }
                                
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Detail