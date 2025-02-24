import React, { useState } from 'react'
import './pagesCss/detail.css'
import { IoCartOutline } from "react-icons/io5";
import product_image2 from "../assets/product_image2.png"

const Detail = () => {

    const colors = [
        {
            color: "red"
        },
        {
            color: "blue"
        },
        {
            color: "#2b2b2b"
        },
        {
            color: "yellow"
        },
    ];
    // const [selectedColor, setSelectedColor] = useState(colors[0]);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        // if (onSelect) onSelect(color);
      };

  return (
    <>
        <div className='detail_body'>
            <div className='detail_image_section'>
                <img src={product_image2} alt='img'/>
            </div>
            <div className='detail_description_section'>
                <div className='detail_description_container'>
                    <h2>21WN reversible angora cardigan</h2>
                </div>
                <div className='detail_description_container'>
                    <h6>$299,43</h6>
                    <div className='avail_container'>
                        <p>Availability:</p>
                        <p>In stock</p>
                    </div>
                    <div className='avail_container'>
                        <p>Category:</p>
                        <p>women</p>
                    </div>
                    <p>Free shipping</p>
                </div>
                <div className='detail_description_container'>
                    <div className='avail_container'>
                        <p>Select Color:</p>
                        <div className='color_picker_container'>
                            {
                                colors.map((e)=>(
                                    <div 
                                        className='color_container'
                                        style={
                                            {
                                                backgroundColor: e.color
                                            }
                                        }
                                    ></div>  
                                ))
                            }
                        </div>
                    </div>
                    <div className='avail_container size_select'>
                        <p>Size:</p>
                        <select>
                            <option>XL</option>
                            <option>L</option>
                            <option>2XL</option>
                            <option>S</option>
                            <option>M</option>
                        </select>
                    </div>
                </div>
                <div className='detail_description_container'>
                    <div className='detail_description_container_last'>
                        <div className='quantity_container'>
                            <button>-</button>
                            <p>2</p>
                            <button>+</button>
                        </div>
                        <div className='add_to_cart_btn_container'>
                            <button>
                                <IoCartOutline className='add_to_cart_icon'/>
                                <p>Add To Cart</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Detail