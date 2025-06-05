import React, { useContext } from "react";
import { AppContext } from "../App";
import "./Cart.css";

export default function Cart() {
  const { cart = [], setCart } = useContext(AppContext);

  const grouped = cart.reduce((acc, item) => {
    const key = item._id || item.id;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});

  const cartItems = Object.values(grouped);

  const handleRemove = (item) => {
    const key = item._id || item.id;
    const idx = cart.findIndex((p) => (p._id || p.id) === key);
    if (idx !== -1) {
      const newCart = [...cart];
      newCart.splice(idx, 1);
      setCart(newCart);
    }
  };

  const handleAdd = (item) => {
    setCart([...cart, item]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-list">
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id || item.id} className="cart-item">
                {item.name} - ${item.price} &nbsp;
                <button
                  className="cart-qty-btn"
                  onClick={() => handleRemove(item)}
                >
                  -
                </button>
                <span className="cart-qty">Qty: {item.quantity}</span>
                <button
                  className="cart-qty-btn"
                  onClick={() => handleAdd(item)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </>
      )}
    </div>
  );
}