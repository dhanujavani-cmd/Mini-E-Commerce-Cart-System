import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    image: "💻",
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
    image: "📱",
  },
  {
    id: 3,
    name: "Headphones",
    price: 2000,
    image: "🎧",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="container">
      <h1>🛒 Mini E-Commerce Cart</h1>

      <h2>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="emoji">{product.image}</div>

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

            <button
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

     <h2>
  Shopping Cart (
  {cart.reduce((total, item) => total + item.qty, 0)}
  )
</h2>

      {cart.map((item) => (
        <div className="cart-card" key={item.id}>
          <h3>{item.image} {item.name}</h3>

          <p>₹{item.price}</p>

          <div className="qty-box">
            <button
              onClick={() =>
                decreaseQty(item.id)
              }
            >
              -
            </button>

            <span>{item.qty}</span>

            <button
              onClick={() =>
                increaseQty(item.id)
              }
            >
              +
            </button>
          </div>

          <button
            className="remove-btn"
            onClick={() =>
              removeItem(item.id)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <h2>
        Total Price : ₹{totalPrice}
      </h2>
    </div>
  );
}

export default App;