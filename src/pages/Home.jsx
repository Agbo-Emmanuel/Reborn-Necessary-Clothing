import React from 'react'
import './pagesCss/home.css'
import ProductCard from '../components/productCard'

const Home = () => {
  return (
    <>
      <div className='home_body'>
        <div className='hero_section'>
          <div className='hero_section_text_container'>
            <h1>Luxury<br/>Fashion<br/>& Accessories</h1>
            <button>Explore Collection</button>
          </div>
        </div>
        <div className='section_one'>
         <div className='section_one_text_container'>
          <h3>NEW ARRIVAL</h3>
         </div>
          <div className='section_one_product_container'>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home