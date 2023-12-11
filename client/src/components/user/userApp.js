import React from 'react'
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Home from "./userHome";
import Login from "./userLogin";
import SignUp from "./userSignup";

const userApp = () => {
  return (
    <Router>
      <div>
        <Route exact path='/user/home' Component={Home}/>
        <Route exact path='/user/login' Component={Login}/>
        <Route exact path='/user/signUp' Component={SignUp}/>
      </div>
    </Router>
  )
}

export default userApp;