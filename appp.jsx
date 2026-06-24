import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Smartphone", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item.id !== id));

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <div className="section">
        <h2>Mini E-Commerce</h2>

        {products.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Shopping Cart</h2>

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h4>{item.name}</h4>

            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <span> {item.quantity} </span>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}

        <h3>Total Price: ₹{total}</h3>
      </div>
    </div>
  );
}

export default App;