import React, { useEffect, useState } from 'react'
import './componentCss/productCard.css'
import product_image1 from '../assets/product_image1.png'
import product_image2 from '../assets/product_image2.jpg'
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
            name: "Tribe & True",
            desc: "Rooted in heritage, styled with edge,Tribe & True is an Afro-inspired kaftan top that celebrates the unique, expresses confidence, and radiates pure happy energy. Bold prints, bold spirit.",
            tag: "Culture in color. Confidence in every thread.",
        },
        {
            id: 2,
            image: product_image2,
            name: "21WN reversible angora cardigan",
            desc: "",
            tag: "$120",
        },
        {
            id: 3,
            image: product_image3,
            name: "Cocktail Bloom",
            desc: "A burst of color and confidence, Cocktail Bloom is the ultimate cocktail dress for the unique, the happy, and the confident. With playful drapes and a sleek silhouette, it’s your go-to for stylish nights and unforgettable entrances.",
            tag: "Sip joy. Wear confidence. Be unforgettable.",
        },
        {
            id: 4,
            image: product_image4,
            name: "21WN reversible angora cardigan",
            desc: "",
            tag: "$120",
        },
        {
            id: 5,
            image: product_image5,
            name: "Sunlit Bloom",
            desc: "Crafted for the unique, made to inspire confidence, and radiating happy vibes. Sunlit Bloom is a burst of sunshine in dress form. With vibrant floral appliqué on bold yellow and a striking magenta twist, it’s your daytime statement of joy.",
            tag: "Be the sunshine. Bloom with confidence.",
        },
        {
            id: 6,
            image: product_image6,
            name: "Berry Royale",
            desc: "Rich, refined, and unforgettable — Berry Royale is a majestic gown for the unique woman who radiates confidence and walks in her happy power. Its deep berry hue and elegant structure make it a timeless showstopper.",
            tag: "Be royal. Be radiant. Be you.",
        },
        {
            id: 7,
            image: product_image7,
            name: "Fierce Petal",
            desc: "Make a statement in Fierce Petal, a floral-textured jumpsuit in hot pink, softened with lace, and tailored for the modern woman who blooms with confidence, shines uniquely, and walks in happy power.",
            tag: "Bloom bold. Live fierce.",
        },
        {
            id: 8,
            image: product_image8,
            name: "21WN reversible angora cardigan",
            desc: "",
            tag: "$120",
        },
        {
            id: 9,
            image: product_image9,
            name: "21WN reversible angora cardigan",
            desc: "",
            tag: "$120",
        },
        {
            id: 10,
            image: product_image10,
            name: "21WN reversible angora cardigan",
            desc: "",
            tag: "$120",
        },
        {
            id: 11,
            image: product_image11,
            name: "21WN reversible angora cardigan",
            desc: "",
            tag: "$120",
        },
        {
            id: 12,
            image: product_image12,
            name: "21WN reversible angora cardigan",
            desc: "",
            tag: "$120",
        },
        {
            id: 13,
            image: product_image13,
            name: "21WN reversible angora cardigan",
            desc: "",
            tag: "$120",
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
                        <h3>{e.name}</h3>
                        <p>{e.desc}</p>
                        <h6>#{e.tag}</h6>
                    </div>
                </div>
            ))
        }
    </>
  )
}


export const MainProductCard = ({limit, showLastFour, width,showMessage, setShowMessage, category})=>{

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
            let products = response.data.allProducts

            // If category is passed, filter
            if (category) {
                const filtered = products.filter(
                    (product) => product.category?.toLowerCase() === category.toLowerCase()
                )

                if (filtered.length === 0) {
                    navigate("/not-available")
                } else {
                    setMainProducts(filtered)
                }
            } else {
                setMainProducts(products)
            }

        }catch(error){
            setLoading(false)
            console.log(error)
            if(error.message == "Network Error"){
                setShowMessage(!showMessage)
                localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"}))
            }else if(error.response?.data?.message == "jwt expired" ){
                setShowMessage(!showMessage)
                localStorage.setItem("message", JSON.stringify({type: "error", value: "Your session has expired. Please log in again."}))
                navigate("/login")
            }else{
                setShowMessage(!showMessage)
                localStorage.setItem("message", JSON.stringify({type: "error", value: error.response.data.message}))
            }
        }
        }

        getAllProducts()
    },[category])

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
                            <img src={e.images[0]} alt=''/>
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