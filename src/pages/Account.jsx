import React, { useEffect, useState } from 'react'
import './pagesCss/account.css'
import axios from 'axios';
import Messagify from '../components/Messagify';

const Account = () => {

    const [user, setUser]= useState(JSON.parse(localStorage.getItem("user")) || [])
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

    // useEffect(()=>{
    //     const getUser = async ()=>{
    //         try{
    //             const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-user"
    //             const token = localStorage.getItem('token');
    //             const theHeaders = {
    //               headers: {
    //                 'Authorization': `Bearer ${token}`
    //                 }
    //             }
    //             const response = await axios.get(url,theHeaders)
    //             console.log(response)
    //             setUser(response.data.user)
    //         }catch(error){
    //             console.log(error)
    //             if(error.message == "Network Error"){
    //                 setShowMessage(!showMessage)
    //                 localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"}))
    //             }else if(error.response?.data?.message == "jwt expired" ){
    //                 setShowMessage(!showMessage)
    //                 localStorage.setItem("message", JSON.stringify({type: "error", value: "Your session has expired. Please log in again."}))
    //                 navigate("/login")
    //             }
    //         }
    //     }

    //     getUser()
    // },[])

  return (
    <>
        {
            message == null ? null : <Messagify type={message.type} message={message.value}/>
        }
        <main className='account_body'>
            <section className='account_top_section'>
                <h3>Account Overview</h3>
            </section>
            <section className='account_details_section'>
                <article className='account_details_container'>
                    <div className='account_details_top'>
                        <h4>ACCOUNT DETAILS</h4>
                    </div>
                    <div className='account_details_item'>
                        <h5>{user?.fullName}</h5>
                        <p>{user?.email}</p>
                    </div>
                </article>
            </section>
        </main>
    </>
  )
}

export default Account