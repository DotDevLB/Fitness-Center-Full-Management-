import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LisComponents from './components/ListComponents';
import HeaderComponet from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateUser from './components/CreateUser';
import LoginPage from './components/LoginPage';
import EditUser from './components/EditUsers';
import GymManagementComponent from './components/GymManagementComponent';
import AdminWelcome from './components/AdminWelcome';
import Cookie from './components/Cookie';

function App() {
  return (
    <Router>
      <div>
        {/* <HeaderComponet /> */}
        <Routes>
          {/* Define your routes using the Route component */}
          <Route path="/users" element={<LisComponents />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/"  element={<LoginPage/>}/>
          <Route path="/update/:userId" element={<EditUser />} />
          <Route path="/gymManage" element ={<GymManagementComponent/>}/>
          <Route path="/user/admin" element={<AdminWelcome/>}/>
          <Route path="/cookie" element={<Cookie/>}/>
          {/* Add more routes as needed */}
        </Routes>
        {/* <FooterComponent /> */}
      </div>
    </Router>
  );
}

export default App;
