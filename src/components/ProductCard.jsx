import React from 'react'
import './componentCss/productCard.css'
import product_image1 from '../assets/product_image1.jpg'
import product_image2 from '../assets/product_image2.jpg'
import product_image3 from '../assets/product_image3.jpg'
import product_image4 from '../assets/product_image4.jpg'
import product_image5 from '../assets/product_image5.jpg'
import product_image6 from '../assets/product_image6.jpg'
import product_image7 from '../assets/product_image7.jpg'
import product_image8 from '../assets/product_image8.jpg'

const ProductCard = () => {

    const products = [
        {
            image: product_image1,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image2,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image3,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image4,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image5,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image6,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image7,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image8,
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