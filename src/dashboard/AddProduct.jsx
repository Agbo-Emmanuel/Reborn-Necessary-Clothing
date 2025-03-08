import React from 'react'
import "./dashboardCss/addProduct.css"
import { RiImageAddLine } from "react-icons/ri";

const AddProduct = () => {
  return (
    <>
        <div className='add_product_body'>
            <div className='add_product_top_container'>
                <h2>Product Information</h2>
            </div>
            <div className='add_product_body_container'>
                <div className='add_product_item_container'>
                    <div className='add_product_input_container'>
                        <label>Product name</label>
                        <input
                            type='text'
                        />
                    </div>
                    <div className='add_product_input_container'>
                        <label>category</label>
                        <select>
                            <option value="">Select category</option>
                            <option value="women">Women</option>
                        </select>
                    </div>
                    <div className='add_product_input_container'>
                        <label>Price</label>
                        <input
                            type='text'
                        />
                    </div>
                    <div className='add_product_input_container'>
                        <label>Product Image</label>
                        <label htmlFor='imageO' className='add_product_image_container'>
                            <RiImageAddLine/>
                        </label>
                        <input id='imageO' type='file' hidden/>
                    </div>
                    <div className='add_product_input_container'>
                        <label>Color</label>
                        <input
                            type='text'
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddProduct