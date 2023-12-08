import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../service/UserService';

const EditUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    dob: '',
    role: ''
  });

  const [user1, setUser1] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    dob: '',
    role: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    dob: '',
    role: ''
  });

  const { userId } = useParams();

  const changeHandler = (event, fieldName) => {
    setUser({ ...user, [fieldName]: event.target.value });
    setErrors({ ...errors, [fieldName]: '' });
  };

  const validateFields = () => {
    const newErrors = {};
    let hasError = false;

    Object.keys(user).forEach((field) => {
      if (!user[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        hasError = true;
      }
    });

    setErrors(newErrors);
    return hasError;
  };

  const editUser = async () => {
    if (validateFields()) {
      return;
    }

    try {
      // Call the updateUser method from the UserService with userId and updated user data
      const response = await UserService.editUser(user, userId);

      // Handle the response or perform any necessary actions
      console.log('User updated successfully:', response.data);

      // Reset the form or redirect the user after successful update
    } catch (error) {
      console.error('Error updating user:', error.message);
      // Handle error, show a message, etc.
    }
  };

  const cancel = () => {
    // Implement cancel logic here
    console.log('Cancelling');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(userId);
        setUser1(response.data);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchData();
  }, [userId]); // Include userId as a dependency to re-fetch data when it changes

  if (!user1) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <nav>
          <div>
            <form>
              <div>
                <label>Firstname</label>
                <input
                  name="firstname"
                  className="form-control"
                  value={user.firstName}
                  placeholder={user1.firstName}
                  onChange={(e) => changeHandler(e, 'firstName')}
                />
                <span style={{ color: 'red' }}>{errors.firstName}</span>
              </div>

              <div>
                <label>Lastname</label>
                <input
                  name="lastname"
                  className="form-control"
                  value={user.lastName}
                  placeholder={user1.lastName}
                  onChange={(e) => changeHandler(e, 'lastName')}
                />
                <span style={{ color: 'red' }}>{errors.lastName}</span>
              </div>

              <div>
                <label>Email</label>
                <input
                  name="email"
                  className="form-control"
                  value={user.email}
                  placeholder={user1.email}
                  onChange={(e) => changeHandler(e, 'email')}
                />
                <span style={{ color: 'red' }}>{errors.email}</span>
              </div>

              <div>
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={user.password}
                  placeholder={user1.password}
                  onChange={(e) => changeHandler(e, 'password')}
                />
                <span style={{ color: 'red' }}>{errors.password}</span>
              </div>

              <div>
                <label>Address</label>
                <input
                  name="address"
                  className="form-control"
                  value={user.address}
                  placeholder={user1.address}
                  onChange={(e) => changeHandler(e, 'address')}
                />
                <span style={{ color: 'red' }}>{errors.address}</span>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={user.role === 'Admin'}
                    onChange={(e) => changeHandler(e, 'role')}
                  />
                  Admin
                </label>

                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Employee"
                    checked={user.role === 'Employee'}
                    onChange={(e) => changeHandler(e, 'role')}
                  />
                  Employee
                </label>
              </div>

              <div>
                <label>Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  className="form-control"
                  value={user.dob}
                  placeholder={user1.dob}
                  onChange={(e) => changeHandler(e, 'dob')}
                />
                <span style={{ color: 'red' }}>{errors.dob}</span>
              </div>

              <button type="button" onClick={editUser}>
                Save
              </button>
              <button type="button" onClick={cancel}>
                Cancel
              </button>
            </form>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default EditUser;
