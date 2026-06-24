import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Headphones", price: 2000 },
  { id: 3, name: "Smart Watch", price: 3500 },
  { id: 4, name: "Phone", price: 25000 },
];

function App() {
  const [cart, setCart] = useState([]);

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

  return (
    <div>
      <h1>Mini E-Commerce Cart</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}

      <h2>Cart</h2>

      {cart.map((item) => (
  <div key={item.id}>
    <p>
      {item.name} × {item.quantity}
    </p>

    <button
  onClick={() => decreaseQty(item.id)}
  style={{ marginRight: "10px" }}
>
   -
</button>

<button onClick={() => increaseQty(item.id)}>
   +
</button>
  </div>
))}

      <h2>Total: ₹{totalPrice}</h2>
    </div>
  );
}

export default App;