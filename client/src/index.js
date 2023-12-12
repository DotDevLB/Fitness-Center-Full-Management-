import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HomeStaff from "./components/home/HomeStaff";
import HomeAdmin from "./components/Admin/HomeAdmin";
import KioskPOS from "./components/home/kiosk/KioskPOS";
import PitchAdmin from "./components/Admin/pitch/PitchManagement";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KioskProductManagement from "./components/Admin/kiosk/KioskProductManagement";
import Home from "./components/user/userHome";
import Login from "./components/user/userLogin";
import SignUp from "./components/user/userSignup";
import PitchReservation from "./components/home/reservattion/reservationManagement";
import UserMangement from "./components/Admin/user/userManagement";
import { AuthProvider } from "./components/user/Auth";
import StaffProfile from "./components/home/StaffProfile";
import GymMembership from "./components/home/GymMembership/MembershipManagement";
import MembershipManagement from "./components/home/GymMembership/MembershipManagement";
import MembershipManagementAdmin from "./components/Admin/GymMembership/MembershipManagement";
import LeagueManegment from "./components/Admin/League/LeagueManagment";
import MakeMatch from "./components/Admin/League/MakeMatch";
import TheLeagues from "./components/Admin/League/TheLeagues";
import Result from "./components/Admin/League/Result";
import ViewLeague from "./components/home/ViewLeague";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/homeStaff" element={<HomeStaff />} />
          <Route path="/homeStaff/kiosk-pos" element={<KioskPOS />} />
          <Route path="/pitchReservation" element={<PitchReservation />} />
          <Route path="/homeStaff/staff-profile" element={<StaffProfile />} />
          <Route path="/homeUser/ViewLeague"
           element={<ViewLeague/>}/>


          <Route
            path="MembershipManagement"
            element={<MembershipManagement />}
          />

          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route
            path="/homeAdmin/products"
            element={<KioskProductManagement />}
          />
          <Route path="/homeAdmin/pitches" element={<PitchAdmin />} />
          <Route path="/homeAdmin/users" element={<UserMangement />} />
          <Route path="/homeAdmin/GymMemberManagement" element={<MembershipManagementAdmin/>}/>
          <Route path="/homeAdmin/LeagueManagment" element={<LeagueManegment/>}/>
          <Route path="/homeAdmin/MakeMatch" element={<MakeMatch/>}/>
          <Route path="/homeAdmin/result" element={<Result/>}/>
          <Route path="/homeAdmin/TheLeagues" element={<TheLeagues/>}/>
  
          <Route exact path="/user/home" Component={Home} />
          <Route exact path="/user/login" Component={Login} />
          <Route exact path="/user/signUp" Component={SignUp} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
