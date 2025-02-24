import React, { useEffect, useState } from 'react'
import './pagesCss/cart.css'
import product_image1 from '../assets/product_image1.png'
import { BsFillCartXFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const navigate = useNavigate()

    const [cart, setCart] = useState([
        {
            id: 1,
            productImage: product_image1,
            productName: "21WN reversible angora cardigan",
            price: 120,
            qty: 2,
            unitPrice: 240,
        },
        {
            id: 2,
            productImage: product_image1,
            productName: "21WN reversible angora cardigan2",
            price: 120,
            qty: 2,
            unitPrice: 240,
        },
        {
            id: 3,
            productImage: product_image1,
            productName: "21WN reversible angora cardiga3",
            price: 120,
            qty: 2,
            unitPrice: 240,
        }
    ])

    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.unitPrice, 0);
        setSubtotal(total);
        setTotal(total + 20)
    }, [cart]);

    function deleteItem(id){
        const filterdCart = cart.filter(item => item.id !== id)
        setCart(filterdCart)
    }

    return (
        <>
    
            {
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
                                        <th>QTY</th>
                                        <th>UNIT PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((e)=>(
                                            <tr key={e.id}>
                                                <td>
                                                    <div className='cart_details_product_container'>
                                                        <button onClick={()=>deleteItem(e.id)}>X</button>
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
                                                <td>
                                                    <div className='cart_details_qty_container'>
                                                        <button>-</button>
                                                        <p>{e.qty}</p>
                                                        <button>+</button>
                                                    </div>
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
                            <button>Checkout</button>
                        </section>
                    </main>
            }
    
        </>
      )
    }

export default Cart