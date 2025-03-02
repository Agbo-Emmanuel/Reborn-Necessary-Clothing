import React from 'react'
import './dashboardCss/product.css'
import { PiDotsThreeCircleDuotone } from "react-icons/pi";

const Product = () => {
  return (
    <>
      <main className='product_list_body'>
        <section className='product_list_top'>
          <h3>All Products</h3>
          <button>+ Add New Product</button>
        </section>
        <section className='product_list_items_container'>
          <article className='product_item_card'>
            <div className='product_item_card_top'>
              <div className='product_item_card_top_left'>
                <div className='product_item_card_image_container'>
                  <img src='' alt='img'/>
                </div>
                <div className='product_item_card_top_text_container'>
                  <h3>21WN reversible angora cardigan</h3>
                  <p>$110.40</p>
                </div>
              </div>
              <div className='product_item_card_top_right'>
                <PiDotsThreeCircleDuotone/>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}

export default Product