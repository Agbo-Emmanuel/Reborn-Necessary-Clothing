import React, { useEffect, useState } from "react";
import "./dashboardCss/product.css";
import { PiDotsThreeCircleDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Messagify from "../components/Messagify";
import axios from "axios";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(() => {
    const storedMessage = localStorage.getItem("message");
    return storedMessage ? JSON.parse(storedMessage) : null;
  });
  const [showOption, setShowOption] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const url =
          "https://reborn-necessary-clothing-backend.onrender.com/api/products/get-all-products";
        const response = await axios.get(url);
        setLoading(false);
        console.log(response);
        setProducts(response.data.allProducts);
        response.data.allProducts.length == 0
          ? localStorage.setItem(
              "message",
              JSON.stringify({
                type: "error",
                value: "There is no available product",
              })
            )
          : localStorage.setItem(
              "message",
              JSON.stringify({
                type: "success",
                value: "Products retrieved successfully",
              })
            );
        setShowMessage(!showMessage);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setShowMessage(!showMessage);
        error.message == "Network Error"
          ? localStorage.setItem(
              "message",
              JSON.stringify({
                type: "error",
                value: "Network Error, please check your internet connection",
              })
            )
          : null;
      }
    };

    getAllProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      setDeleteLoading(true);
      const url =
        "https://reborn-necessary-clothing-backend.onrender.com/api/products/delete-product";
      const body = { productId };
      const response = await axios.post(url, body);
      setDeleteLoading(false);
      console.log(response);
      localStorage.setItem(
        "message",
        JSON.stringify({ type: "success", value: response.data.message })
      );
      setShowMessage(!showMessage);
      navigate("/dashboard");
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
      setShowMessage(!showMessage);
      error.message == "Network Error"
        ? localStorage.setItem(
            "message",
            JSON.stringify({
              type: "error",
              value: "Network Error, please check your internet connection",
            })
          )
        : null;
    }
  };

  return (
    <>
      {message == null ? null : (
        <Messagify type={message.type} message={message.value} />
      )}
      <main className="product_list_body">
        <section className="product_list_top">
          <h3>All Products</h3>
          {loading ? <p>retreiving...</p> : null}
          <button onClick={() => navigate("/add-product")}>
            + Add New Product
          </button>
        </section>
        {loading ? <p className="dashboard_loading_p">retreiving...</p> : null}
        <section className="product_list_items_container">
          {products.map((e) => (
            <article key={e._id} className="product_item_card">
              {showOption == e._id ? (
                <div className="product_option_container">
                  <button
                    className="delete_btn"
                    onClick={() => deleteProduct(e._id)}
                  >
                    {deleteLoading ? "..." : "Delete"}
                  </button>
                </div>
              ) : null}
              <div className="product_item_card_top">
                <div className="product_item_card_top_left">
                  <div className="product_item_card_image_container">
                    <img src={e.images[0]} alt="" />
                  </div>
                  <div className="product_item_card_top_text_container">
                    <h3>{e.productName}</h3>
                    <p>${/*{e.price}*/}</p> 
                  </div>
                </div>
                <div
                  className="product_item_card_top_right"
                  onClick={() => setShowOption(e._id)}
                >
                  <PiDotsThreeCircleDuotone />
                </div>
              </div>
              {/* <div className='product_item_card_bottom'>
                  <p>Remaining Products</p>
                  <p>{e.sizes.L + e.sizes.S + e.sizes.M + e.sizes.XL + e.sizes.twoXL + e.sizes.threeXL}</p>
                </div> */}
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Product;
