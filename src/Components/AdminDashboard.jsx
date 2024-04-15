import React, { useState } from "react";
import { auth } from "../firebase-config";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { db } from "../firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const handleclick = () => {
    signOut(auth);
    nav("/");
  };
  const read = async () => {
    const collectionRef = collection(db, "Employees");
    const Snap = await getDocs(collectionRef);
    let list = [];
    Snap.forEach((doc) => {
      list.push(doc.data());
    });
    setData(list);
  };
  read();
  return (
    <Box sx={{ flexGrow: 1 }}>
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
              handleclick();
            }}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">Employment</TableCell>
              <TableCell align="right">Attendance</TableCell>
              <TableCell align="right">Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.ID}
                </TableCell>
                <TableCell align="right">{row.Name}</TableCell>
                <TableCell align="right">{row.Position}</TableCell>
                <TableCell align="right">{row.Salary}</TableCell>
                <TableCell align="right">{row.Employment}</TableCell>
                <TableCell align="right">{row.Attendance}</TableCell>
                <TableCell align="right">{row.Contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Button align> ADD EMPLOYEE</Button>
        </div>
        <TextField id="ID" label="ID" variant="outlined" />
        <TextField id="Name" label="Name" variant="outlined" />
        <TextField id="Position" label="Position" variant="outlined" />
        <TextField id="Salary" label="Salary" variant="outlined" />
        <TextField id="Employment" label="Employment" variant="outlined" />
        <TextField id="Attendance" label="Attendance" variant="outlined" />
        <TextField id="Contact" label="Contact" variant="outlined" />
      </Box>
    </Box>
  );
}
