import React, { useEffect, useState } from 'react'
import './pagesCss/newArrivals.css'
import {MainProductCard} from '../components/ProductCard'
import Messagify from '../components/Messagify'

const NewArrivals = () => {

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState(() => {
    const storedMessage = localStorage.getItem("message");
    return storedMessage ? JSON.parse(storedMessage) : null;
  });
              
  useEffect(() => {
    const handleStorageChange = () => {
    const storedMessage = localStorage.getItem("message");
    if (storedMessage) {
      setMessage(JSON.parse(storedMessage));
    } else {
      setMessage(null);
    }
    };
              
    setTimeout(() => {
      localStorage.removeItem("message");
      setMessage(null); // Clear the state
    }, 5000);
              
    handleStorageChange()
  }, [showMessage]);

  return (
    <>
      {
        message == null ? null : <Messagify type={message.type} message={message.value}/>
      }
      <main className='new_arrivals_body'>
        <section className='new_arrivals_hero_section'>
          <h1>Designer Mood</h1>
          <p>Designed, Made & Styled!</p>
        </section>
        <section className='new_arrivals_items_container'>
          <MainProductCard showMessage = {showMessage} setShowMessage={setShowMessage}/>
        </section>
      </main>
    </> 
  )
}

export default NewArrivals