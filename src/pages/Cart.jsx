import React, { useEffect, useState } from 'react'
import './pagesCss/cart.css'
import product_image1 from '../assets/product_image1.png'
import { BsFillCartXFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Messagify from '../components/Messagify';

const Cart = () => {

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

    const [cart, setCart] = useState([])
    const [cartLoading, setCartLoading] = useState(false)

    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        const getCart = async ()=>{
            try{
                setCartLoading(true)
                const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-cart"
                const token = localStorage.getItem('token');
                const theHeaders = {
                  headers: {
                    'Authorization': `Bearer ${token}`
                    }
                }
                const response = await axios.get(url,theHeaders)
                setCartLoading(false)
                console.log(response)
                setCart(response.data.cart.reverse())
            }catch(error){
                setCartLoading(false)
                console.log(error)
                setShowMessage(!showMessage)
                error.message == "Network Error" ? 
                localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"})) : null
            }
        }

        getCart()
    },[])

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        setSubtotal(total);
        setTotal(total + 20)
    }, [cart]);

    async function deleteItem (id){
        const filterdCart = cart.filter(item => item._id !== id)
        try{
            const url = "https://reborn-necessary-clothing-backend.onrender.com/api/products/delete-cart"
            const token = localStorage.getItem('token');
            const theHeaders = {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            }
            const body = { cartId: id }

            const response = await axios.post(url, body, theHeaders)
            console.log(response)
            setCart(filterdCart)
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "success", value: response.data.message}))

        }catch(error){
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

            {
                cartLoading ? 
                    <div className='cartLoading'>retrieving cart item...</div> 
                : 

                    cart.length == 0 ? 
                        <div className='cart_empty_body'>
                            <div className='cart_empty_icon_container'>
                                    <BsFillCartXFill/>
                            </div>
                            <h3>Your cart is empty!</h3>
                            <p>Browse our categories and discover our best deals!</p>
                            <button onClick={()=>navigate("/")}>Start Shopping</button>
                        </div> 
                    :
                        <main className='cart_body'>
                            <section className='cart_details_section'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>PRODUCT</th>
                                            <th>PRICE</th>
                                            <th>size</th>
                                            <th>QTY</th>
                                            <th>UNIT PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((e)=>(
                                                <tr key={e._id}>
                                                    <td>
                                                        <div className='cart_details_product_container'>
                                                            <button onClick={()=>deleteItem(e._id)}>X</button>
                                                            <div className='cart_product_container'>
                                                                <div className='cart_product_image_container'>
                                                                    <img src={e.productImage} alt='img'/>
                                                                </div>
                                                                <div className='cart_product_name_container'>
                                                                    <p>{e.productName}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>${e.price}</td>
                                                    <td>{e.size}</td>
                                                    <td>
                                                        {e.qty}
                                                            {/* <div className='cart_details_qty_container'>
                                                                <button>-</button>
                                                                <p>{e.qty}</p>
                                                                <button>+</button>
                                                            </div> */}
                                                    </td>
                                                    <td>${e.unitPrice}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </section>
                            <section className='cart_checkout_section'>
                                <article className='cart_checkout_details_container'>
                                    <p>Subtotal</p>
                                    <p>${subtotal}</p>
                                </article>
                                <article className='cart_checkout_details_container'>
                                    <p>Shipping Fee</p>
                                    <p>$20</p>
                                </article>
                                <article className='cart_checkout_details_container'>
                                    <p>Coupon</p>
                                    <p>no</p>
                                </article>
                                <article className='cart_checkout_details_container'>
                                    <p>TOTAL</p>
                                    <p>${total}</p>
                                </article>
                                <button onClick={()=>navigate("/checkout")}>Checkout</button>
                            </section>
                        </main>
            }
    
    
        </>
      )
    }

export default Cart