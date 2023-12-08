import React, { useState } from 'react';
import UserService from '../service/UserService';

const CreateUser = () => {
  const [user, setUser] = useState({
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

  const saveUser = async () => {
    if (validateFields()) {
      return;
    }

    try {
      const response = await UserService.createUser(user);
      console.log('User created successfully:', response.data);
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        dob: '',
        role: ''
      });
      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        dob: '',
        role: ''
      });
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const cancel = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      dob: '',
      role: ''
    });
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      dob: '',
      role: ''
    });
    console.log('Cancelling');
  };

  return (
    <div>
      <header>
        <nav>
          <div>
            <form>
              <div>
                <label htmlFor="firstname">Firstname</label>
                <input
                  name="firstname"
                  className="form-control"
                  value={user.firstName}
                  onChange={(e) => changeHandler(e, 'firstName')}
                />
                <span style={{ color: 'red' }}>{errors.firstName}</span>
              </div>

              <div>
                <label htmlFor="lastname">Lastname</label>
                <input
                  name="lastname"
                  className="form-control"
                  value={user.lastName}
                  onChange={(e) => changeHandler(e, 'lastName')}
                />
                <span style={{ color: 'red' }}>{errors.lastName}</span>
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  className="form-control"
                  value={user.email}
                  onChange={(e) => changeHandler(e, 'email')}
                />
                <span style={{ color: 'red' }}>{errors.email}</span>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={user.password}
                  onChange={(e) => changeHandler(e, 'password')}
                />
                <span style={{ color: 'red' }}>{errors.password}</span>
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <input
                  name="address"
                  className="form-control"
                  value={user.address}
                  onChange={(e) => changeHandler(e, 'address')}
                />
                <span style={{ color: 'red' }}>{errors.address}</span>
              </div>

              <div>
                <label>Role</label>
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
                <span style={{ color: 'red' }}>{errors.role}</span>
              </div>

              <div>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  className="form-control"
                  value={user.dob}
                  onChange={(e) => changeHandler(e, 'dob')}
                />
                <span style={{ color: 'red' }}>{errors.dob}</span>
              </div>

              <button type="button" onClick={saveUser}>
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

export default CreateUser;
