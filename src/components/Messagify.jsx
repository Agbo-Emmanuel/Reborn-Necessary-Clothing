import React from 'react'
import './componentCss/messagify.css'
import { FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Messagify = ({type, message}) => {
  return (
    <>
        <div className='messagify_body'>
            <div className='message_container'>
                <div className='message_icon_container' style={type == "error" ? {color: "red"} : {color: "green"}}>
                    {
                        type == "error" ? <AiOutlineCloseCircle/> :  <FaCheckCircle/>
                    }    
                </div>
                <p>
                    {message}
                </p>
                {/* <div className='cancel_icon_container'>
                    <RxCross2/>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default Messagify