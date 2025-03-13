import React from 'react'
import './dashboardCss/manageOrders.css'
import OrderList from '../components/OrderList'

const ManageOrders = () => {
  return (
    <>
      <div className='manage_orders_body'>
        <h3>Orders:</h3>
        <div className='order_list_container'>
          <OrderList/>
        </div>
      </div>
    </>
  )
}

export default ManageOrders