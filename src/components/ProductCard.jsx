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

        {
            products.map((e)=>(
                <div className='product_card_body'>
                    <div className='product_card_image_container'>
                        <img src={e.image} alt=''/>
                    </div>
                    <div className='product_card_text_container'>
                        <p>{e.name}</p>
                        <h6>{e.price}</h6>
                    </div>
                </div>
            ))
        }
    </>
  )
}

export default ProductCard