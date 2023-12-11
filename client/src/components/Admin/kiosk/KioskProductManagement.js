import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KioskProductManagement.css";

const KioskProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [flavor, setFlavor] = useState("");
  const [price, setPrice] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products/all");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Set the state of respective fields
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "flavor":
        setFlavor(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "quantityAvailable":
        setQuantityAvailable(value);
        break;
      default:
        break;
    }
  };

  const addNewProduct = async () => {
    try {
      await axios.post("http://localhost:8080/products/save", {
        name,
        description,
        flavor,
        price,
        quantityAvailable,
      });
      fetchProducts();
      // Reset form fields after adding
      setName("");
      setDescription("");
      setFlavor("");
      setPrice("");
      setQuantityAvailable("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const confirmDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };
  
  const updateProductQuantity = async (productId, quantityToAdd) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${productId}`);
      const productData = response.data;
  
      await axios.put(`http://localhost:8080/products/update/${productId}`, {
        ...productData, 
        quantityAvailable: quantityToAdd, 
      });
  
      fetchProducts();
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };
  
  const handleQuantityUpdate = (productId, quantityToAdd) => {

    const updatedQuantity = products.find((product) => product.id === productId).quantityAvailable + quantityToAdd;
    updateProductQuantity(productId, updatedQuantity);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/delete/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    
    <div className="container mt-4">
      <h2>Kiosk Product Management</h2>
      
      <div className="mb-3">
        <button className="btn btn-primary mb-2" onClick={addNewProduct}>
          Add New Product
        </button>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Flavor</label>
            <input
              type="text"
              className="form-control"
              name="flavor"
              value={flavor}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price/Unit</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="text"
              className="form-control"
              name="quantityAvailable"
              value={quantityAvailable}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Flavor</th>
            <th>Price/Unit</th>
            <th>Quantity</th>
            <th>Update Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={product.quantityAvailable < 50 ? 'table-danger' : ''}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.flavor}</td>
              <td>{product.price}</td>
              <td>{product.quantityAvailable}</td>
              <td>
                <div className="input-group">
                  <input
                    type="number"
                    className="small-input" 
                    placeholder="Add Qty"
                    id={`input${product.id}`} 
                  />
                  <button
                    className="btn btn-outline-primary update-btn"
                    onClick={() => {
                      const inputField = document.querySelector(`#input${product.id}`);
                      if (inputField) {
                        const quantityToAdd =
                          parseInt(inputField.value);
                        handleQuantityUpdate(product.id, quantityToAdd);
                        inputField.value = ''; 
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KioskProductManagement;
