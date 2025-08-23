import React, { useEffect, useState } from "react";
import "./dashboardCss/addProduct.css";
import { RiImageAddLine } from "react-icons/ri";
import { LiaSpinnerSolid } from "react-icons/lia";
import axios from "axios";
import Messagify from "../components/Messagify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
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

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [previewProductImage, setPreviewProductImage] = useState(
    new Array(4).fill(null)
  );
  const [ProductImages, setProductImages] = useState(new Array(4).fill(null));
  const [sizes, setSizes] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    twoXL: 0,
    threeXL: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);

    // Update productImages
    setProductImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
    console.log(ProductImages);

    // Update previewImages
    setPreviewProductImage((prev) => {
      const updated = [...prev];
      updated[index] = preview;
      return updated;
    });
    console.log(previewProductImage);
  };

  const changeSizes = (e) => {
    const { name, value } = e.target;
    setSizes({ ...sizes, [name]: value });
  };

  const addProduct = async () => {
    const url =
      "https://reborn-necessary-clothing-backend.onrender.com/api/products/create-product";
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("sizes", JSON.stringify(sizes));
    ProductImages.forEach((image) => {
      if (image) {
        formData.append("images", image); // same key for all files
      }
    });
    try {
      setLoading(true);
      const response = await axios.post(url, formData);
      setLoading(false);
      console.log(response);
      setShowMessage(!showMessage);
      localStorage.setItem(
        "message",
        JSON.stringify({ type: "success", value: response.data.message })
      );
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setShowMessage(!showMessage);
      localStorage.setItem(
        "message",
        JSON.stringify({ type: "error", value: error.response.data.message })
      );
    }
  };

  return (
    <>
      {message == null ? null : (
        <Messagify type={message.type} message={message.value} />
      )}
      <div className="add_product_body">
        <div className="add_product_top_container">
          <h2>Product Information</h2>
        </div>
        <div className="add_product_body_container">
          <div className="add_product_item_container">
            <div className="add_product_input_container">
              <label>Product name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="add_product_input_container">
              <label>category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
            </div>
            <div className="add_product_input_container">
              <label>Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="add_product_input_container">
              <label>Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="add_product_input_container">
              <label>Product Images</label>
              <div className="add_product_images_section">
                {previewProductImage.map((e, index) => (
                  <div key={index} className="add_product_images_body">
                    <label
                      htmlFor={`image-${index}`}
                      className="add_product_image_container"
                    >
                      <img src={e} alt="" />
                    </label>
                    <RiImageAddLine className="add_product_image_icon" />
                    <input
                      id={`image-${index}`}
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="add_product_input_container">
              <label>Sizes</label>
              <div className="add_product_sizes_container">
                <div className="add_product_sizes_item_container">
                  <p>S:</p>
                  <input
                    type="number"
                    name="S"
                    value={sizes.S}
                    onChange={(e) => changeSizes(e)}
                  />
                </div>
                <div className="add_product_sizes_item_container">
                  <p>M:</p>
                  <input
                    type="number"
                    name="M"
                    value={sizes.M}
                    onChange={(e) => changeSizes(e)}
                  />
                </div>
                <div className="add_product_sizes_item_container">
                  <p>L:</p>
                  <input
                    type="number"
                    name="L"
                    value={sizes.L}
                    onChange={(e) => changeSizes(e)}
                  />
                </div>
                <div className="add_product_sizes_item_container">
                  <p>XL:</p>
                  <input
                    type="number"
                    name="XL"
                    value={sizes.XL}
                    onChange={(e) => changeSizes(e)}
                  />
                </div>
                <div className="add_product_sizes_item_container">
                  <p>2XL:</p>
                  <input
                    type="number"
                    name="twoXL"
                    value={sizes.twoXL}
                    onChange={(e) => changeSizes(e)}
                  />
                </div>
                <div className="add_product_sizes_item_container">
                  <p>3XL:</p>
                  <input
                    type="number"
                    name="threeXL"
                    value={sizes.threeXL}
                    onChange={(e) => changeSizes(e)}
                  />
                </div>
              </div>
            </div> */}
            <div className="add_product_button_container">
              <button onClick={addProduct}>
                {loading ? (
                  <LiaSpinnerSolid className="add_product_button_icon" />
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
