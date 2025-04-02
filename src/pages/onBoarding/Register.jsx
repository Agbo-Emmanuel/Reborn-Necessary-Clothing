import React, { useEffect, useState } from 'react'
import './onBoardingCss/onboarding.css'
import rbnc_logo_white from '../../assets/rbnc_logo_white.png'
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import Messagify from '../../components/Messagify';
import { LiaSpinnerSolid } from "react-icons/lia";

const Register = () => {

    const navigate = useNavigate()

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
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [values, setValues] = useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
    const [loading, setLoading] = useState(false)

    const onType = (e)=>{
      const {name, value} = e.target
      setValues({...values, [name]: value})
      console.log(values)
    }

    const register = async (e)=>{
      e.preventDefault();
      if(!values.fullName){
        setShowMessage(!showMessage)
        localStorage.setItem("message", JSON.stringify({type: "error", value: "full name is required"}));
      }else if(!values.email){
        setShowMessage(!showMessage)
        localStorage.setItem("message", JSON.stringify({type: "error", value: "email is required"}));
      }else if(!values.password){
        setShowMessage(!showMessage)
        localStorage.setItem("message", JSON.stringify({type: "error", value: "password is required"}));
      }else if(values.confirmPassword != values.password){
        setShowMessage(!showMessage)
        localStorage.setItem("message", JSON.stringify({type: "error", value: "passwords does not match"}));
      }
      else{
        try{
          setLoading(true)
          const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/register"
          const body = {fullName: values.fullName, email: values.email, password: values.password}
          const response = await axios.post(url, body)
          console.log(response)
          setLoading(false)
          setShowMessage(!showMessage)
          localStorage.setItem("message", JSON.stringify({type: "success", value: response.data.message}));
          navigate("/login");    
  
        }catch(error){
          console.log(error)
          setLoading(false)
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
    }

  return (
    <>
      {
        message == null ? null : <Messagify type={message.type} message={message.value}/>
      }
      <main className='onboarding_body'>
        <form onSubmit={register} className='onboarding_container'>
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
                name='fullName'
                value={values.fullName}
                onChange={(e)=>onType(e)}
              />
            </div>
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
            <div className='onboarding_input_container'>
              <input
                type= {showConfirmPassword == true ? 'text' : 'password'}
                placeholder='Confirm your Password'
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={(e)=>onType(e)}
              />
              <div className='password_eye_container' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                {
                  showConfirmPassword == true ? <AiFillEyeInvisible/> : <AiFillEye/>
                }
              </div>
            </div>
          </article>
          <button type='submit'>{loading ? <LiaSpinnerSolid className='spinner'/> : "Register"}</button>
          <article className='onboarding_bottom_text_container'>
            <p>Already have an account? <span onClick={()=>navigate("/login")}>LOGIN</span></p>
          </article>
        </form>
      </main>
      
    </>
  )
}

export default Register