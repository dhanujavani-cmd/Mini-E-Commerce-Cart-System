import React, { useState } from 'react';
import './App.css';

const products = [
  { id: 1, name: 'Laptop', price: 50000 },
  { id: 2, name: 'Smartphone', price: 20000 },
  { id: 3, name: 'Headphones', price: 2000 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
        <h3>Total Price: ₹{total}</h3>
      </div>
    </div>
  );
}

export default App;
body { background: #f4f7f6; font-family: sans-serif; }

.container {
  display: flex;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 300px;
}

.card, .cart-item {
  border: 1px solid #eee;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  text-align: center;
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.remove-btn { background: #e74c3c; }