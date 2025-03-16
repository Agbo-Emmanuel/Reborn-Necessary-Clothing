import React from 'react'
import './componentCss/orderList.css'

const OrderList = ({loading, allOrders}) => {

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
                      <button className='view_order_details_btn'>view details</button>
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