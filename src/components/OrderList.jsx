import React from 'react'
import './componentCss/orderList.css'
import { useNavigate } from 'react-router-dom'

const OrderList = ({loading, allOrders}) => {

  const navigate = useNavigate()

  return (
    <>
      <div className='order_list_body'>
        <table>
          <thead>
            <tr>
              <th>#orderID</th>
              <th>item</th>
              <th>Status</th>
              <th>view details</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? 
                <tr className='order_list_loading'>
                  <td><button></button></td>
                  <td><button></button></td>
                  <td><button></button></td>
                  <td><button></button></td>
                </tr>
              :
                allOrders?.map((e)=>(
                  <tr key={e._id}>
                    <td>{e._id}</td>
                    <td>{e.items.length}</td>
                    <td style={{color: "#96beff"}}>{e.status}</td>
                    <td>
                      <button className='view_order_details_btn' onClick={()=>navigate(`/order-details/${e._id}`)}>view details</button>
                    </td>
                  </tr>
                ))
            }

          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderList