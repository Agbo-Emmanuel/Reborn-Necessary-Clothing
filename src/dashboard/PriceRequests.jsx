import React, { useEffect, useState } from "react";
import "./dashboardCss/pricerequest.css";
import axios from "axios";
import Messagify from "../components/Messagify";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const PriceRequests = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [priceRequests, setPriceRequests] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(() => {
    const storedMessage = localStorage.getItem("message");
    return storedMessage ? JSON.parse(storedMessage) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedMessage = localStorage.getItem("message");
      if (storedMessage) {
        setMessage(JSON.parse(storedMessag));
      } else {
        setMessage(null);
      }
    };

    setTimeout(() => {
      localStorage.removeItem("message");
      setMessage(null); // Clear the state
    }, 5000);

    handleStorageChange();
  }, [showMessage]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const url =
          "https://reborn-necessary-clothing-backend.onrender.com/api/auth/get-user";
        const token = localStorage.getItem("token");
        const theHeaders = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, theHeaders);
        console.log(response);
        setPriceRequests(response.data.user.priceRequests);
      } catch (error) {
        console.log(error);
        if (error.message == "Network Error") {
          setShowMessage(!showMessage);
          localStorage.setItem(
            "message",
            JSON.stringify({
              type: "error",
              value: "Network Error, please check your internet connection",
            })
          );
        } else if (error.response?.data?.message == "jwt expired") {
          setShowMessage(!showMessage);
          localStorage.setItem(
            "message",
            JSON.stringify({
              type: "error",
              value: "Your session has expired. Please log in again.",
            })
          );
          navigate("/login");
        }
      }
    };

    getUser();
  }, []);

  const deleteRequest = () => {};

  return (
    <>
      {/* {
        message == null ? null : <Messagify type={message.type} message={message.value}/>
      } */}
      <main className="manage_users_body">
        <h3>Users:</h3>
        {userLoading ? <p>retrieving users...</p> : null}
        <section className="manage_users_table_section">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {priceRequests.map((e, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>
                    <button onClick={() => deleteRequest(e.index)}>
                      {loading == e.index ? (
                        <LiaSpinnerSolid className="td_button_icon" />
                      ) : (
                        "delete"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default PriceRequests;
