import React from "react";
import { Link } from "react-router-dom";

function AdminHome() {

  const handleLogout = () => {
    sessionStorage.removeItem("token");  
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Admin Dashboard</h1>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Link to="/homeAdmin/users">
            <button className="btn btn-primary btn-lg mb-3">User Management</button>
          </Link>
          <br />
          <Link to="/homeAdmin/products">
            <button className="btn btn-primary btn-lg mb-3">Kiosk Product Management</button>
          </Link>
          <br />
          <Link to="/pitchReservation">
            <button className="btn btn-primary btn-lg mb-3">Reservation Manager</button>
          </Link>
          <br />
          <Link to="/homeAdmin/pitches">
            <button className="btn btn-primary btn-lg">Pitch Management</button>
          </Link>
          <br />
          <br />
          <Link to="/homeStaff/staff-profile">
            <button className="btn btn-primary btn-lg">Manage Profile</button>
          </Link>
          <br />
          <br />
          <Link to="/homeAdmin/GymMemberManagement">
            <button className="btn btn-primary btn-lg">Gym Members Management</button>
          </Link>
          <br />
          <br />
          <button className="btn btn-danger btn-lg" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
