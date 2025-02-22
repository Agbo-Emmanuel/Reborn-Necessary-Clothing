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
import product_image9 from '../assets/product_image9.jpg'
import product_image10 from '../assets/product_image10.jpg'
import product_image11 from '../assets/product_image11.jpg'
import product_image12 from '../assets/product_image12.jpg'
import product_image13 from '../assets/product_image13.jpg'

const ProductCard = ({limit, showLastFour, width}) => {

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
        {
            image: product_image9,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image10,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image11,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image12,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            image: product_image13,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
    ]

    const productsToDisplay = showLastFour 
        ? products.slice(-4)  // Get the last four items
        : limit 
            ? products.slice(0, limit)  // Get the first `limit` items
            : products;

  return (
    <>

        {
            productsToDisplay.map((e)=>(
                <div className='product_card_body' style={width ? {width: width} : null}>
                    <div className='product_card_image_container'>
                        <img src={e.image} alt=''/>
                    </div>
                    <div className='product_card_text_container'>
                        <p>{e.name}</p>
                        {/* <h6>{e.price}</h6> */}
                    </div>
                </div>
            ))
        }
    </>
  )
}

export default ProductCard