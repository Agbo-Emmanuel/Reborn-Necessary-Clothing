import React, { useEffect, useState } from "react";
import "./componentCss/requestform.css";
import axios from "axios";

const RequestPrice = ({ setShowRequestPriceForm }) => {
  const [showMessage, setShowMessage] = useState(false);
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

    handleStorageChange();
  }, [showMessage]);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: "",
    phone: "",
    countryCode: "+234",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const body = {
        email: value.email,
        phone: value.countryCode + value.phone,
      };
      const url =
        "https://reborn-necessary-clothing-backend.onrender.com/api/products/request-price";
      const response = await axios.post(url, body);
      setLoading(false);
      setShowRequestPriceForm(false);
      console.log(response);
      setShowMessage(!showMessage);
      localStorage.setItem(
        "message",
        JSON.stringify({ type: "success", value: response.data.message })
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      } else {
        setShowMessage(!showMessage);
        localStorage.setItem(
          "message",
          JSON.stringify({ type: "error", value: error.response.data.message })
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="request_price_form_body">
        <form onSubmit={handleSubmit} className="request_price_form">
          <button
            type="button"
            className="request_price_form_close_btn"
            onClick={() => setShowRequestPriceForm(false)}
          >
            X
          </button>
          <h2>Request Price</h2>
          <div className="request_price_form_input">
            <label>Email</label>
            <input
              type="email"
              required
              name="email"
              value={value.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="request_price_form_input">
            <label>WhatsApp Phone Number</label>
            <div className="phone_input_container">
              {/* Country selector */}
              <select
                value={value.country}
                onChange={(e) => handleChange(e)}
                name="countryCode"
              >
                <option value="+234">Nigeria</option>
                <option value="+1">USA</option>
                <option value="+44">UK</option>
                <option value="+233">Ghana</option>
                {/* add more as needed */}
              </select>

              {/* Country code (based on selected country) */}
              <span className="country_code">{value.countryCode}</span>

              {/* Phone number input */}
              <input
                type="number"
                name="phone"
                required
                value={value.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <button className="request_price_form_submit_btn" type="submit">
            {loading ? "loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RequestPrice;
