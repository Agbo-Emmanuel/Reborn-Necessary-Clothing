import React, { useState } from 'react'
import './onBoardingCss/onboarding.css'
import rbnc_logo_white from '../../assets/rbnc_logo_white.png'
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {

    const navigate = useNavigate()
  
    const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      
      <main className='onboarding_body'>
        <section className='onboarding_container'>
          <article className='onboarding_logo_container' onClick={()=>navigate("/")}>
            <img src={rbnc_logo_white} alt='logo'/>
          </article>
          <article className='onboarding_top_text_container'>
            <h3>Welcome to Reborn-necessary-clothing</h3>
            <p>Fill in your details to register</p>
          </article>
          <article className='onboarding_input_body'>
            <div className='onboarding_input_container'>
              <input
                type='text'
                placeholder='Enter Full name'
              />
            </div>
            <div className='onboarding_input_container'>
              <input
                type='email'
                placeholder='Enter Email Address'
              />
            </div>
            <div className='onboarding_input_container'>
              <input
                type= {showPassword == true ? 'text' : 'password'}
                placeholder='Enter your Password'
              />
              <div className='password_eye_container' onClick={()=>setShowPassword(!showPassword)}>
                {
                  showPassword == true ? <AiFillEyeInvisible/> : <AiFillEye/>
                }
              </div>
            </div>
          </article>
          <button>Register</button>
          <article className='onboarding_bottom_text_container'>
            <p>Already have an account? <span onClick={()=>navigate("/login")}>LOGIN</span></p>
          </article>
        </section>
      </main>
      
    </>
  )
}

export default Register