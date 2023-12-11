import React, { useCallback, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import app from "./base.js";
import { AuthContext } from "./Auth.js";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
        alert(error);
      }
    },
    []
  );

  const currentUser = authContext && authContext.currentUser;

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
              <h1 className="card-title mb-4">Log in</h1>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
