import React, { useState } from 'react';
import UserService from '../service/UserService';
import { Link, useNavigate } from 'react-router-dom';

const jumbotronStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 0px 15px 0px #000000',
};

const linkStyle = {
  color: '#fff',
};

const LoginUser = () => {
  const [formData, setForm] = useState({
    email: '',
    password: '',
  });
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const navigateTo = useNavigate();

  const changeEmailHandler = (event) => {
    setForm({ ...formData, email: event.target.value });
  };

  const changePasswordHandler = (event) => {
    setForm({ ...formData, password: event.target.value });
  };

  const LoginTheUser = async () => {
    try {
      // Convert the formData to x-www-form-urlencoded format
      const urlSearchParams = new URLSearchParams();
      for (const key in formData) {
        urlSearchParams.append(key, formData[key]);
      }

      // Call the loginUser method from the UserService with formData as an argument
      const response = await UserService.loginUser(urlSearchParams);

      // Check if login was successful
      if (response.data.includes('Employee')) {
        console.log('Login successful:', response.data);
        setAuthenticated(true);
        setEmployee(true);
        setLoginMessage('Welcome Employee!');
        // Redirect after successful login
        navigateTo('/gymManage');
      } else if (response.data.includes('Admin')) {
        console.log('Login successful:', response.data);
        setAuthenticated(true);
        setLoginMessage('Welcome Admin!');
        setAdmin(true);
        // Redirect after successful login
        navigateTo('/user/admin');
      } else {
        console.log('Login failed:', response.data);
        // Handle unsuccessful login (show a message, etc.)
        setLoginMessage('Login failed. Please try again.');
        setShowWarning(true);
      }

      // Reset the form after a successful login
      setForm({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle error, show a message, etc.
    }
  };

  const cancel = () => {
    // Implement cancel logic here
    console.log('Cancelling');
  };

  return (
    <div>
      <header>
        <nav>
          <div className="container mt-3">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={changeEmailHandler}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={changePasswordHandler}
                />
              </div>

              <button type="button" className="btn btn-primary" onClick={LoginTheUser}>
                Login
              </button>

              <button type="button" className="btn btn-secondary ms-2" onClick={cancel}>
                Cancel
              </button>

              {/* Display a warning message for unsuccessful login */}
              {showWarning && (
                <div className="alert alert-warning mt-3" role="alert">
                  {loginMessage}
                </div>
              )}
            </form>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default LoginUser;
