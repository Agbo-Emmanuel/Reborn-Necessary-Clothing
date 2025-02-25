import React, { useState } from 'react'
import './onBoardingCss/onboarding.css'
import rbnc_logo_white from '../../assets/rbnc_logo_white.png'
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {

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
                    <h3>Welcome Back!</h3>
                    <p>Type in your email and password to login</p>
                </article>
                <article className='onboarding_input_body'>
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
                <button>Login</button>
                <article className='onboarding_bottom_text_container'>
                    <p>Don't have an account? <span onClick={()=>navigate("/register")}>REGISTER</span></p>
                </article>
            </section>
        </main>
    
    </>
  )
}

export default Login