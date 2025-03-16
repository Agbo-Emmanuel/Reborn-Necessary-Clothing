import React, { useEffect, useState } from 'react'
import './componentCss/productCard.css'
import product_image1 from '../assets/product_image1.png'
import product_image2 from '../assets/product_image2.png'
import product_image3 from '../assets/product_image3.png'
import product_image4 from '../assets/product_image4.png'
import product_image5 from '../assets/product_image5.jpg'
import product_image6 from '../assets/product_image6.png'
import product_image7 from '../assets/product_image7.png'
import product_image8 from '../assets/product_image8.jpg'
import product_image9 from '../assets/product_image9.jpg'
import product_image10 from '../assets/product_image10.jpg'
import product_image11 from '../assets/product_image11.jpg'
import product_image12 from '../assets/product_image12.png'
import product_image13 from '../assets/product_image13.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ProductCard = ({limit, showLastFour, width}) => {

    const products = [
        {
            id: 1,
            image: product_image1,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 2,
            image: product_image2,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 3,
            image: product_image3,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 4,
            image: product_image4,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 5,
            image: product_image5,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 6,
            image: product_image6,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 7,
            image: product_image7,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 8,
            image: product_image8,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 9,
            image: product_image9,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 10,
            image: product_image10,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 11,
            image: product_image11,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 12,
            image: product_image12,
            name: "21WN reversible angora cardigan",
            price: "$120",
        },
        {
            id: 13,
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
                <div key={e.id} className='product_card_body' style={width ? {width: width} : null}>
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


export const MainProductCard = ({limit, showLastFour, width})=>{

    const navigate = useNavigate()

    const [mainProducts, setMainProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getAllProducts = async ()=>{
        try{
            setLoading(true)
            const url = "https://reborn-necessary-clothing-backend.onrender.com/api/products/get-all-products"
            const response = await axios.get(url)
            setLoading(false)
            console.log(response)
            setMainProducts(response.data.allProducts)
        }catch(error){
            setLoading(false)
            console.log(error)
        }
        }

        getAllProducts()
    },[])

    return(
        <>
        {
            loading ? 
                // <div className='product_loading'>
                //     <p>Retrieving Products...</p>
                // </div>
                <div className="skeleton-container">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="skeleton-card"></div>
                    ))}
                </div>
            : 
                mainProducts.map((e)=>(
                    <div key={e._id} className='product_card_body' style={width ? {width: width} : null} onClick={()=>navigate(`/detail/${e._id}`)}>
                        <div className='product_card_image_container'>
                            <img src={e.image} alt=''/>
                        </div>
                        <div className='product_card_text_container'>
                            <p>{e.productName}</p>
                            <h6>${e.price}</h6>
                        </div>
                    </div>
                ))
        }

        </>
    )
}