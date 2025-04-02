import React from 'react'
import './componentCss/messagify.css'
import { FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Messagify = ({type, message}) => {
  return (
    <>
        <div className='messagify_body' style={type == "error" ? {backgroundColor: "red"} : {backgroundColor: "green"}}>
            <div className='message_container'>
                <div className='cancel_icon_container'>
                    {/* <RxCross2/> */}
                </div>
                <p>
                    {message}
                </p>
                <div className='message_icon_container'>
                    {
                        type == "error" ? <AiOutlineCloseCircle/> :  <FaCheckCircle/>
                    }    
                </div>
            </div>
        </div>
    </>
  )
}

export default Messagify