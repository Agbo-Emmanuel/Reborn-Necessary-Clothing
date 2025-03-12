import React, { useEffect, useState } from 'react'
import './dashboardCss/manageUsers.css'
import axios from 'axios'
import Messagify from '../components/Messagify'
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { FaBedPulse } from 'react-icons/fa6';

const ManageUsers = () => {

  const navigate = useNavigate()
  const [users, setUsers]= useState([])
  const [userLoading, setUserLoading] = useState(false)
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

  useEffect(()=>{
    const getUser = async ()=>{
      try{
        setUserLoading(true)
        const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-all-user"
        const response = await axios.get(url)
        setUserLoading(false)
        console.log(response)
        setUsers(response.data.allUser)
        response.data.allUser.length == 0 ? 
        localStorage.setItem("message", JSON.stringify({type: "error", value: "There are no users registered yet"})) :
        localStorage.setItem("message", JSON.stringify({type: "success", value: "Users retrieved successfully"}))
        setShowMessage(!showMessage)
      }catch(error){
        setUserLoading(false)
        console.log(error)
        setShowMessage(!showMessage)
        error.message == "Network Error" ? 
        localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"})) : null
      }
      }

      getUser()
  },[])

  const [loading, setLoading] = useState(false)

  const deleteUser = async (id)=>{
    const url = "https://reborn-necessary-clothing-backend.onrender.com/api/auth/delete-user"
    const body = {userId: id}
    try{
      setLoading(id)
      const response = await axios.post(url, body)
      setLoading(false)
      console.log(response)
      setShowMessage(!showMessage)
      localStorage.setItem("message", JSON.stringify({type: "success", value: response.data.message}))
      navigate("/dashboard")

    }catch(error){
      setLoading(false)
      console.log(error)
      setShowMessage(!showMessage)
      error.message == "Network Error" ? 
      localStorage.setItem("message", JSON.stringify({type: "error", value: "Network Error, please check your internet connection"})) : null
    }
  }

  return (
    <>
      {
        message == null ? null : <Messagify type={message.type} message={message.value}/>
      }
      <main className='manage_users_body'>
        <h3>Users:</h3>
        {
          userLoading ? <p>retrieving users...</p> : null
        }
        <section className='manage_users_table_section'>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((e, index)=>(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.fullName}</td>
                    <td>{e.email}</td>
                    <td>
                      <button onClick={()=>deleteUser(e._id)}>{loading == e._id ? <LiaSpinnerSolid className='td_button_icon'/> : "delete"}</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}

export default ManageUsers