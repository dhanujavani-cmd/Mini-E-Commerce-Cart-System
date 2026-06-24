import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "💻 Laptop", price: 50000 },
  { id: 2, name: "🎧 Headphones", price: 2000 },
  { id: 3, name: "⌚ Smart Watch", price: 3500 },
  { id: 4, name: "📱 Phone", price: 25000 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product) => {
    const item = cart.find((p) => p.id === product.id);

    if (item) {
      setCart(
        cart.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (cart.length === 0) return;

    setOrderPlaced(true);
    setCart([]);

    setTimeout(() => {
      setOrderPlaced(false);
    }, 3000);
  };

  return (
    <div className="container">
      <h1>🛒 Mini E-Commerce Store</h1>

      {/* PRODUCTS */}
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="cart">
        <h2>🧺 Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty 😶</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>
                {item.name} × {item.quantity}
              </p>

              <div>
                <button onClick={() => decreaseQty(item.id)}>
                  -
                </button>
                <button onClick={() => increaseQty(item.id)}>
                  +
                </button>
              </div>
            </div>
          ))
        )}

        <h3>Total: ₹{totalPrice}</h3>

        <button onClick={placeOrder} className="order-btn">
          Place Order 🚀
        </button>

        {orderPlaced && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            🎉 Order Placed Successfully!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
.order-btn {
  background: green;
  margin-top: 10px;
}

.order-btn:hover {
  background: darkgreen;
}