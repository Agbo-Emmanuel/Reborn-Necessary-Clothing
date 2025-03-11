import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import './onBoardingCss/onboarding.css'
import rbnc_logo_white from '../../assets/rbnc_logo_white.png'
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Messagify from '../../components/Messagify';
import axios from 'axios';
import { LiaSpinnerSolid } from "react-icons/lia";

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const [loginType, setLoginType] = useState()

    useEffect(()=>{
        location.pathname.includes("admin") ? setLoginType("Admin") : setLoginType("Back")
    },[])

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

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const onType = (e)=>{
        const {name, value} = e.target
        setValues({...values, [name]: value})
        console.log(values)
      }

    async function login (e){
        e.preventDefault();
        try{
            setLoading(true)
            const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/login"
            const body = {email: values.email, password: values.password}
            const response = await axios.post(url, body)
            console.log(response.data.isAdmin)
            response.data.isAdmin == true ? navigate("/dashboard") : navigate("/");  
            setLoading(false)
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "success", value: response.data.message}));
            localStorage.setItem("token", response.data.token);  
        
        }catch(error){
            console.log(error)
            setLoading(false)
            setShowMessage(!showMessage)
            localStorage.setItem("message", JSON.stringify({type: "error", value: error.response.data.message}));
        }
    }

  return (
    <>
        {
            message == null ? null : <Messagify type={message.type} message={message.value}/>
        }
        <main className='onboarding_body'>
            <form onSubmit={login} className='onboarding_container'>
                <article className='onboarding_logo_container' onClick={()=>navigate("/")}>
                    <img src={rbnc_logo_white} alt='logo'/>
                </article>
                <article className='onboarding_top_text_container'>
                    <h3>Welcome {loginType}</h3>
                    <p>Type in your email and password to login</p>
                </article>
                <article className='onboarding_input_body'>
                    <div className='onboarding_input_container'>
                        <input
                            type='email'
                            placeholder='Enter Email Address'
                            name='email'
                            value={values.email}
                            onChange={(e)=>onType(e)}
                        />
                    </div>
                    <div className='onboarding_input_container'>
                        <input
                            type= {showPassword == true ? 'text' : 'password'}
                            placeholder='Enter your Password'
                            name='password'
                            value={values.password}
                            onChange={(e)=>onType(e)}
                        />
                        <div className='password_eye_container' onClick={()=>setShowPassword(!showPassword)}>
                            {
                                showPassword == true ? <AiFillEyeInvisible/> : <AiFillEye/>
                            }
                        </div>
                    </div>
                </article>
                <button type='submit'>{loading ? <LiaSpinnerSolid className='spinner'/> : "Login"}</button>
                {
                    loginType == "Admin" ? null : 
                    <article className='onboarding_bottom_text_container'>
                        <p>Don't have an account? <span onClick={()=>navigate("/register")}>REGISTER</span></p>
                    </article>
                }
            </form>
        </main>
    
    </>
  )
}

export default Login