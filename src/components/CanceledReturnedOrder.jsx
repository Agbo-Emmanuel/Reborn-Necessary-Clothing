import React from 'react'
import './componentCss/deliverytype.css'
import { LuPackageOpen } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';


const CanceledReturnedOrder = ({theOrder}) => {

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
                        <h3>No Closed Orders to Display</h3>
                        <p>All your Closed Orders will be saved here.</p>
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

export default CanceledReturnedOrder