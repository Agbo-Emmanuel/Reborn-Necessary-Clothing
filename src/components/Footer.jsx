import React from 'react'
import './componentCss/footer.css'
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className='footer_body'>
        <div className='footer_link_container'>
          <FaTwitter className='footer_media_icon'/>
          <AiFillInstagram className='footer_media_icon'/>
          <FaYoutube className='footer_media_icon'/>
          <Link to='/designer-mood' className='footer_nav'>Designer Mood</Link>
          <Link to="/product-category/For Her" className='footer_nav'>For Her</Link>
          <Link className='footer_nav'>For Him</Link>
          <Link className='footer_nav'>Accessories</Link>
        </div>
        <div className='footer_copyRight_container'>
          <p>Copyright© rbnc All Rights Reserved.</p>
        </div>
      </div>
    </>
  )
}

export default Footer