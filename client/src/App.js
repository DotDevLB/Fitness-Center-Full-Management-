import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null); 
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const loginFailure = () => {
    console.log('Login failed');
  };
  const handleSetCookie = (userData) => {
    console.log('UserData before stringifying:', userData); // Log userData before stringifying
    const userDataString = JSON.stringify(userData); // Convert object to JSON string
    Cookies.set('currentUser', userDataString); // Set the cookie with user data string
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get('http://localhost:8080/users/getByEmailAndPassword', {
        params: {
          email: email,
          password: password,
        }
      });
      console.log('Login successful:', response.data);
      setCurrentUser(response.data);
      const userRole = response.data.role;
      handleSetCookie(response.data);
      if (userRole === 1) {
        navigate('/homeAdmin');
      } else {
        navigate('/homeStaff');
      }
  
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        loginFailure();
        toast.error('Incorrect email or password.');
      } else {
        toast.error('An error occurred while logging in.');
      }
      console.error('Error:', error.message);
    }
  };
  
  return (
    <div className="container mt-5">
      <ToastContainer position="top-left" />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
