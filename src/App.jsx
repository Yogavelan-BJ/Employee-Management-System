import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import Auth from "./Components/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/Admin-dashboard" element={<AdminDashboard />} />
          <Route path="/auth/User-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
