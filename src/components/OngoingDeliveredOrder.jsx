import React from 'react'
import './componentCss/deliverytype.css'
import { LuPackageOpen } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const OngoingDeliveredOrder = ({theOrder}) => {

    const navigate = useNavigate()

  return (
    <>
        <main className='deliverytype_order_body'>
            {
                theOrder.length == 0 ? 
                    <section className='empty_order_detail_container'>
                        <div className='empty_order_icon'>
                            <LuPackageOpen/>
                        </div>
                        <h3>You have placed no orders yet!</h3>
                        <p>All your orders will be saved here for you to access their state anytime.</p>
                        <button onClick={()=>navigate("/")}>Continue Shopping</button>
                    </section>
                :  
                    <section className='order_detail_container'>

                    </section> 
            }
        </main>
    </>
  )
}

export default OngoingDeliveredOrder