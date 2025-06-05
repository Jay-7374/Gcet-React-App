import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export default function Product() {
  const { user, cart = [], setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("https://gcet-node-app-sigma.vercel.app/products/all");
    setProducts(res.data);
  };

  const handleAddToCart = (product) => {
    if (setCart) {
      setCart([...cart, product]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h3>Welcome {user.name}!</h3>
      <h2>Product List</h2>
      <div className="products-grid">
        {products &&
          products.map((value) => (
            <div className="product-card" key={value._id || value.id}>
              <div className="product-info">
                <span className="product-name">{value.name}</span>
                <span className="product-price">${value.price}</span>
              </div>
              <button
                className="add-cart-btn"
                onClick={() => handleAddToCart(value)}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}