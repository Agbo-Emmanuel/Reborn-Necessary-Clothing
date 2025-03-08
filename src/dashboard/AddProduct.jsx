import React, { useState } from 'react'
import "./dashboardCss/addProduct.css"
import { RiImageAddLine } from "react-icons/ri";

const AddProduct = () => {

    const [productName, setProductName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [productImage, setProductImage] = useState("")
    const [theProductImage, setTheProductImage] = useState(null)
    const [sizes, setSizes] = useState(
        {
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
            twoXL: 0,
            threeXL: 0
        }
    )

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProductImage(imageUrl);
            setTheProductImage(file);
        }
    };

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
                            value= {productName}
                            onChange={(e)=>setProductName(e.target.value)}
                        />
                    </div>
                    <div className='add_product_input_container'>
                        <label>category</label>
                        <select  value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Select category</option>
                            <option value="women">Women</option>
                        </select>
                    </div>
                    <div className='add_product_input_container'>
                        <label>Price</label>
                        <input
                            type='text'
                            value= {price}
                            onChange={(e)=>setPrice(e.target.value)}
                        />
                    </div>
                    <div className='add_product_input_container'>
                        <label>Product Image</label>
                        <label htmlFor='imageO' className='add_product_image_container'>
                            <img src={productImage} alt=''/>
                            <RiImageAddLine className='add_product_image_icon'/>
                        </label>
                        <input id='imageO' type='file' hidden onChange={handleFileChange}/>
                    </div>
                    <div className='add_product_input_container'>
                        <label>Sizes</label>
                        <div className='add_product_sizes_container'>
                            <div className='add_product_sizes_item_container'>
                                <p>S:</p>
                                <input type='number' name='S' value={sizes.S}/>
                            </div>
                            <div className='add_product_sizes_item_container'>
                                <p>M:</p>
                                <input type='number' name='M' value={sizes.M}/>
                            </div>
                            <div className='add_product_sizes_item_container'>
                                <p>L:</p>
                                <input type='number' name='L' value={sizes.L}/>
                            </div>
                            <div className='add_product_sizes_item_container'>
                                <p>XL:</p>
                                <input type='number' name='XL' value={sizes.XL}/>
                            </div>
                            <div className='add_product_sizes_item_container'>
                                <p>2XL:</p>
                                <input type='number' name='twoXl' value={sizes.twoXL}/>
                            </div>
                            <div className='add_product_sizes_item_container'>
                                <p>3XL:</p>
                                <input type='number' name='threeXL' value={sizes.threeXL}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddProduct