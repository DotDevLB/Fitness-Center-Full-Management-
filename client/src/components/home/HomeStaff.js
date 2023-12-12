import React from "react";
import { Link } from "react-router-dom";

function HomeStaff() {
  const profileStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "14px",
  };

  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Welcome Staff</h1>
        <br/>
        <br/>
        <br/>        
        <br/>
        <Link to="/homeStaff/kiosk-pos" className="btn-link">
          <button className="btn btn-primary btn-lg mb-3">Kiosk POS</button>
        </Link>
        <br />
        <Link to="/pitchReservation" className="btn-link">
          <button className="btn btn-primary btn-lg mb-3">Reservation Manager</button>
        </Link>
        <br />
        <Link to="/membershipManagement" className="btn-link">
          <button className="btn btn-primary btn-lg">Gym Membership Manager</button>
        </Link>
        <br />
        <br />
        <Link to="/homeUser/ViewLeague" className="btn-link">
          <button className="btn btn-primary btn-lg">View League</button>
        </Link>
       

        
      </div>
    </div>
  );
}

export default HomeStaff;
