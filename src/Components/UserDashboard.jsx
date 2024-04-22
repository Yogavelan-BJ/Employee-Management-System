import React from "react";
import { useLocation } from "react-router-dom";

function UserDashboard() {
  const loc = useLocation();
  const { userid } = loc.state;
  return <div>{userid}</div>;
}

export default UserDashboard;
