import React, { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth.js";
import app from "./base.js"; // Import the app instance only

const Signup = () => {
  const navigate = useNavigate();
  const auth = app.auth();
  const authContext = useContext(AuthContext);
  const currentUser = authContext && authContext.currentUser;

  const handleSignup = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/user/home", { replace: true });
    }
  }, [currentUser, navigate]);


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title mb-4">Sign Up</h1>
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
