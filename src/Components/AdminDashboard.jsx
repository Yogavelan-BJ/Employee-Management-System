import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminHeader from "./AdminHeader";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
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
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AdminHeader />
      <TableContainer component={Paper} sx={{ width: "500px" }}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Position</TableCell>
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
                <TableCell align="right">
                  <Link to="/auth/Admin-dashboard/manage" state={row}>
                    <Button>Manage</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
