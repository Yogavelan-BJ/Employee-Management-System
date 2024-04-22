import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import Auth from "./Components/Auth";
import AddEmployee from "./Components/AddEmployee";
import ManageEmployee from "./Components/ManageEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/Admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/auth/Admin-dashboard/AddEmployee"
            element={<AddEmployee />}
          />
          <Route
            path="/auth/Admin-dashboard/manage"
            element={<ManageEmployee />}
          />
          <Route path="/auth/User-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
