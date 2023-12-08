import React from 'react';
import { Link } from 'react-router-dom';

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

const AdminWelcome = () => {
  
    const userEmail = localStorage.getItem('userEmail');
       return (
    <div style={{ textAlign: 'center' }}>
      <div className="container mt-5">
        <div className="jumbotron" style={jumbotronStyle}>
          <h1 className="display-4">Welcome to Admin</h1>
          <p>{userEmail} is signed in , Welcome</p>
          <hr className="my-4" />
          <p>Explore the content and enjoy your stay.</p>
          <Link to={`/gymManage`} className="btn btn-info btn-lg">
                  Gym
                </Link>
                <br />
                <Link to={`/users`} className="btn btn-secondary btn-lg">
                  Another Page
                </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
