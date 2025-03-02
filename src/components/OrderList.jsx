import React from 'react'
import './componentCss/orderList.css'
import product_image1 from '../assets/product_image1.png'

const OrderList = () => {
  return (
    <>
      <div className='order_list_body'>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Order ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='order_list_product_container'>
                  <img src={product_image1} alt='image'/>
                  <p>21WN reversible angora cardigan</p>
                </div>
              </td>
              <td>#453645</td>
              <td>x3</td>
              <td>$230</td>
              <td>delivered</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderList