import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HomeStaff from "./components/home/HomeStaff"
import HomeAdmin from "./components/Admin/HomeAdmin"
import KioskPOS from "./components/home/kiosk/KioskPOS";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KioskProductManagement from "./components/Admin/KioskProductManagement";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/homeStaff" element={<HomeStaff />}/>
        <Route path="/homeStaff/kiosk-pos" element={<KioskPOS />} />

        <Route path="/homeAdmin" element={<HomeAdmin />}/>
        <Route path="/homeAdmin/products" element={<KioskProductManagement />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
