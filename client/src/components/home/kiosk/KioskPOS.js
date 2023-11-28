import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toastContianer, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const orderSuccess = () => {
  toast.success("Order Completed");
};

const orderFailure = () => {
  toast.error("Order Failed");
};


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products/all");
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const foundProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (foundProductIndex !== -1) {
      updatedCart[foundProductIndex].quantity++;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const updateTotalPrice = (updatedCart) => {
    const updatedTotalPrice = updatedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(updatedTotalPrice);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = [...cart];
    const foundProductIndex = updatedCart.findIndex(
      (item) => item.id === productId
    );

    if (foundProductIndex !== -1) {
      updatedCart[foundProductIndex].quantity--;
      if (updatedCart[foundProductIndex].quantity === 0) {
        updatedCart.splice(foundProductIndex, 1);
      }
    }

    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  };


  const generateInvoice = async () => {
    let invoice = 'Invoice:\n\n';
  
    for (const item of cart) {
      const totalPriceForItem = item.price * item.quantity;
      invoice += `Item:\n`;
      invoice += `Name: ${item.name}\n`;
      invoice += `Price per unit: ${item.price}$\n`;
      invoice += `Quantity: ${item.quantity}\n`;
      invoice += `Total price for this item: ${totalPriceForItem}$\n\n`;
      
      try {
        await axios.put(`http://localhost:8080/products/update/${item.id}`, {
          quantityAvailable: item.quantityAvailable - item.quantity,
          name: item.name,
          description: item.description,
          flavor: item.flavor,
          price: item.price,
        });
        console.log(`Quantity updated for ${item.name}`);
        orderSuccess();
      } catch (error) {
        console.error('Error updating quantity:', error);
        orderFailure();
      }
    }
  
    invoice += `Total Price: ${totalPrice}$`;
    console.log(invoice);
    setCart([]);
  };
  

  return (
    <div className="container mt-5">
       <ToastContainer postiotion="top-left"   />
      <h1>Products</h1>
      <div className="row">
        {products.map((product, index) => (
          <div
            className="col-md-4 mb-4"
            key={index}
            onClick={() => addToCart(product)}
          >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text">Flavor: {product.flavor}</p>
                <p className="card-text">Price: {product.price}$</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary mt-5">
        <h2>Cart</h2>
        {cart.map((item, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Price: {item.price}$</p>
              <p className="card-text">Quantity: {item.quantity}</p>
              <button
                className="btn btn-danger mr-2"
                onClick={() => decrementQuantity(item.id)}
              >
                Remove One
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove All
              </button>
            </div>
          </div>
        ))}
        <div className="total-price">
          <p className="text-center mt-3">Total Price: {totalPrice}$</p>
        </div>
        <div className="container mt-5">
      <button className="btn btn-primary" onClick={generateInvoice}>
        Generate Invoice
      </button>
    </div>
      </div>
    </div>
    
  );
}

export default App;
