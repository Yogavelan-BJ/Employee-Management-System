import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const nav = useNavigate();
  const handleclick = () => {
    signOut(auth);
    nav("/");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {`Admin : ${auth.currentUser.email}`}
        </Typography>
        <Button
          onClick={() => {
            nav("/auth/Admin-dashboard");
          }}
          color="inherit"
        >
          Dashboard
        </Button>
        <Button
          onClick={() => {
            nav("/auth/Admin-dashboard/AddEmployee");
          }}
          color="inherit"
        >
          Add Employee
        </Button>
        <Button
          onClick={() => {
            handleclick();
          }}
          color="inherit"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;
