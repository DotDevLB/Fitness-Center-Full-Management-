import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CreateUserForm = ({ updateUserList }) => {
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      dob: "",
      role: 0,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:8080/users/save",
          user
        );
        console.log("User created:", response.data);
        // Update the user list in the parent component after successful creation
        updateUserList();
        // Reset form fields
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          address: "",
          dob: "",
          role: 0,
        });
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First Name"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last Name"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="dob"
            className="form-control"
            placeholder="Date of Birth"
            value={user.dob}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <select
            name="role"
            className="form-select"
            value={user.role}
            onChange={handleChange}
          >
            <option value={1}>Admin</option>
            <option value={0}>Staff</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    );
  };
const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:8080/users/update/${userId}`, {
        ...users.find(user => user.id === userId),
        role: newRole,
      });
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/delete/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                >
                  <option value={1}>Admin</option>
                  <option value={0}>Staff</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="btn btn-danger"
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


const App = () => {
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const updateUserList = () => {
    setUpdateTrigger(!updateTrigger);
  };

  return (
    <div>
      <CreateUserForm updateUserList={updateUserList} />
      <UserList key={updateTrigger} />
    </div>
  );
};

export default App;
