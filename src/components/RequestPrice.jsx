import React, { useEffect, useState } from "react";
import "./componentCss/requestform.css";
import axios from "axios";
import Swal from "sweetalert2";

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
    name: "",
    email: "",
    reconfirmEmail: "",
    phone: "",
    countryCode: "+234",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const body = {
        name: value.name,
        email: value.email,
        phone: value.countryCode + value.phone,
      };
      const url =
        "https://reborn-necessary-clothing-backend.onrender.com/api/products/request-price";
      const response = await axios.post(url, body);
      setLoading(false);
      setShowRequestPriceForm(false);
      Swal.fire({
        icon: "info",
        title: "We’ve Got Your Request",
        text: "The tailored price for this exclusive creation will be communicated to you by email or sms. Please verify your email address and your phone number.",
        // draggable: true,
      });
      console.log(response);
      // setShowMessage(!showMessage);
      // localStorage.setItem(
      //   "message",
      //   JSON.stringify({ type: "success", value: response.data.message })
      // );
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
          <p>Please Fill this information to get price for product.</p>
          <div className="request_price_form_input">
            <label>Name</label>
            <input
              type="text"
              required
              name="name"
              value={value.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
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
            <label>Reconfirm-Email</label>
            <input
              type="text"
              required
              name="reconfirmEmail"
              value={value.reconfirmEmail}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="request_price_form_input">
            <label>Phone Number</label>
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
                <option value="+91">India</option>
                <option value="+61">Australia</option>
                <option value="+49">Germany</option>
                <option value="+33">France</option>
                <option value="+39">Italy</option>
                <option value="+34">Spain</option>
                <option value="+81">Japan</option>
                <option value="+86">China</option>
                <option value="+82">South Korea</option>
                <option value="+55">Brazil</option>
                <option value="+52">Mexico</option>
                <option value="+27">South Africa</option>
                <option value="+20">Egypt</option>
                <option value="+90">Turkey</option>
                <option value="+62">Indonesia</option>
                <option value="+47">Norway</option>
                <option value="+46">Sweden</option>
                <option value="+45">Denmark</option>
                <option value="+358">Finland</option>
                <option value="+31">Netherlands</option>
                <option value="+41">Switzerland</option>
                <option value="+43">Austria</option>
                <option value="+32">Belgium</option>
                <option value="+48">Poland</option>
                <option value="+420">Czech Republic</option>
                <option value="+36">Hungary</option>
                <option value="+40">Romania</option>
                <option value="+30">Greece</option>
                <option value="+98">Iran</option>
                <option value="+92">Pakistan</option>
                <option value="+94">Sri Lanka</option>
                <option value="+63">Philippines</option>
                <option value="+65">Singapore</option>
                <option value="+60">Malaysia</option>
                <option value="+66">Thailand</option>
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
