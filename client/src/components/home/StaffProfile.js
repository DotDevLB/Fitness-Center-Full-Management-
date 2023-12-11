import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toastContianer, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const passSuccess = () => {
    toast.success("Password Updated ");
  };
  
  const passFail = () => {
    toast.error("Password Failed");
  };
  
function UserProfile() {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = Cookies.get("currentUser");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const response = await axios.get(`http://localhost:8080/users/${parsedUserData.id}`);
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = { ...user };
      updatedUser.password = user.password;
      await axios.put(`http://localhost:8080/users/update/${user.id}`, updatedUser);
      passSuccess();
    } catch (error) {
      console.error("Error updating password:", error);
      passFail();
    }
  };
  

  return (
    <div className="container mt-4">
       <ToastContainer postiotion="top-left"   />

      <h2>User Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
