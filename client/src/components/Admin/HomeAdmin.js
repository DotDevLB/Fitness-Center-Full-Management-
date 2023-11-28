import React from "react";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Link to="/admin/users">
            <button className="btn btn-primary btn-lg mb-3">User Management</button>
          </Link>
          <br />
          <Link to="/homeAdmin/products">
            <button className="btn btn-primary btn-lg mb-3">Kiosk Product Management</button>
          </Link>
          <br />
          <Link to="/admin/reports">
            <button className="btn btn-primary btn-lg">Reports</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
