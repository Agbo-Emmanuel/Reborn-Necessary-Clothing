import React from 'react'
import './componentCss/productCard.css'

const ProductCard = () => {

    const products = [
        {
            image: "",
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: "",
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: "",
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: "",
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: "",
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: "",
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: "",
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: "",
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
    ]

  return (
    <>
        <div className='product_card_body'>
            <div className='product_card_image_container'>
                <img src='' alt=''/>
            </div>
            <div className='product_card_text_container'>
                <p>21WN reversible angora cardigan</p>
                <h6>$120</h6>
            </div>
        </div>
    </>
  )
}

export default ProductCard