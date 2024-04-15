import React from "react";
import { auth } from "../firebase-config";
import { Navigate, Outlet } from "react-router-dom";

function Auth() {
  return <>{auth.currentUser ? <Outlet /> : Navigate({ to: "/" })}</>;
}

export default Auth;
