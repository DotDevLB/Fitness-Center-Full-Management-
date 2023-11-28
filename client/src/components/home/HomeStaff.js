import React from "react";
import { Link } from "react-router-dom";

function HomeStaff() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Link to="/homeStaff/kiosk-pos">
          <button className="btn btn-primary btn-lg mb-3">Kiosk POS</button>
        </Link>
        <br />
        <Link to="/reservation-manager">
          <button className="btn btn-primary btn-lg mb-3">Reservation Manager</button>
        </Link>
        <br />
        <Link to="/membership-manager">
          <button className="btn btn-primary btn-lg">Gym Membership Manager</button>
        </Link>
      </div>
    </div>
  );
}

export default HomeStaff;
