import React, { useState } from 'react'
import './pagesCss/productCategory.css'
import { useNavigate, useParams } from 'react-router-dom'
import hero_section_image_two from "../assets/hero_section_image_two.jpg"
import for_him_image from "../assets/for_him_image.avif"
import {MainProductCard} from '../components/ProductCard'


const ProductCategory = () => {

    const navigate = useNavigate()
    const {category} = useParams()

    const [priceValue, setPriceValue] = useState(0)

    const [categories, SetCategories] = useState([
        { category: 'Designer Mood', no: '3' },
        { category: 'For Her', no: '48' },
        { category: 'For Him', no: '10' },
        { category: 'Accessories', no: '0' },
       /* { category: 'All Stars', no: '18' },*/
    ])

    const backgroundImages = {
        "women": hero_section_image_two,
        "men" : for_him_image,
    };

    const heroBackgroundImage = backgroundImages[category];

  return (
    <>
        <main className='product_category_body'>
            <aside className='product_category_aside'>
                <section className='aside_category_container'>
                    <h2>Hot Deals</h2>
                    {
                        categories.map((item, index)=>(
                            <div key={index} className='aside_category_link'>
                                <p>{item.category}</p>
                                <p>({item.no})</p>
                            </div>
                        ))
                    }
                </section>
                <section className='aside_category_container'>
                    <h2>Prices</h2>
                    <div className='aside_category_price_range_container'>
                        <h3>Ranger:</h3>
                        <div className='price_ranger_container'>
                            <input 
                                type='range'
                                value={priceValue}
                                onChange={(e)=>setPriceValue(e.target.value)}
                            />
                            <span>${priceValue}.00</span>
                        </div>
                    </div>
                </section>
            </aside>
            <article className='product_category_article'>
                <section 
                    className='category_article_hero_section' 
                    style={{
                        backgroundImage: `linear-gradient(to right, #000000dd, #000000cd), url(${heroBackgroundImage})`,
                    }}
                >
                    <h1>{category.toUpperCase()}</h1>
                </section>
                <section className='category_article_text_section'>
                    <p>Step into a world of style with our curated collection of women’s clothing, where modern trends meet timeless elegance. From effortless everyday looks to standout pieces for special moments, 
                    every design is crafted to embody Confidence, Happiness, and Big Energy in every season.</p>
                </section>
                <section className='category_article_product_container'>
                    <MainProductCard width="27%" category={category}/>
                </section>
            </article>
        </main>
    </>
  )
}

export default ProductCategory