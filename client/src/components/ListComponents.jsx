import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

const ListComponents = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUser();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      // Call your UserService.deleteUser or handle deletion logic here
      await UserService.deleteUSer(userId);

      // Refresh the user list after deletion
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div>
        <Link to="/createUser">
          <button>Click</button>
        </Link>
      </div>

      <h2 className="text-center mb-4">List of Users</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>  
              <td>{user.address}</td>             
              <td>{user.dob}</td>             
              <td>{user.role}</td>            
              <td>
                {/* Edit button */}
                <Link to={`/update/${user.id}`}>
                  <button className="btn btn-info">Edit</button>
                </Link>
              </td>
              <td>
                {/* Delete button */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
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

export default ListComponents;
