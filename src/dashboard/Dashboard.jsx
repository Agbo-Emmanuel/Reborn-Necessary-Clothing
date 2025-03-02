import React from 'react'
import './dashboardCss/dashboard.css'
import { MdSell, MdAttachMoney, MdGroups, MdKeyboardArrowDown  } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import OrderList from '../components/OrderList';

const Dashboard = () => {
  return (
    <>
      <main className='dashboard_body'>
        <section className='dashboard_details_body'>
          <article className='dashboard_details_card'>
            <div className='dashboard_details_icon_container'>
              <MdSell/>
            </div>
            <div className='dashboard_details_text_container'>
              <p>Total Sales</p>
              <h3>100</h3>
            </div>
          </article>
          <article className='dashboard_details_card'>
            <div className='dashboard_details_icon_container'>
              <MdAttachMoney/>
            </div>
            <div className='dashboard_details_text_container'>
              <p>Total Income</p>
              <h3>$37,432</h3>
            </div>
          </article>
          <article className='dashboard_details_card'>
            <div className='dashboard_details_icon_container'>
              <AiOutlineCheckCircle />
            </div>
            <div className='dashboard_details_text_container'>
              <p>Orders Paid</p>
              <h3>100</h3>
            </div>
          </article>
          <article className='dashboard_details_card'>
            <div className='dashboard_details_icon_container'>
              <MdGroups  />
            </div>
            <div className='dashboard_details_text_container'>
              <p>Total Users</p>
              <h3>300</h3>
            </div>
          </article>
        </section>
        <section className='dashboard_recent_orders_section'>
          <article className='dashboard_recent_orders_top'>
            <h3>Recent orders</h3>
            <p>View all <MdKeyboardArrowDown size={18}/></p>
          </article>
          <article className='dashboard_recent_orders_body'>
            <OrderList/>
          </article>
        </section>
      </main>
    </>
  )
}

export default Dashboard