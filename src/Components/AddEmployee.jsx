import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import AdminHeader from "./AdminHeader";

function AddEmployee() {
  const [ID, setID] = useState("");
  const [Name, setName] = useState("");
  const [Position, setPosition] = useState("");
  const [Employment, setEmployment] = useState("");
  const [Salary, setSalary] = useState("");
  const [Mail, setMail] = useState("");
  const handleSubmit = async (e) => {
    try {
      await setDoc(doc(db, "Employees", `${e.target.ID.value}`), {
        ID: e.target.ID.value,
        Name: e.target.Name.value,
        Employment: e.target.Employment.value,
        Salary: e.target.Salary.value,
        Attendance: 0,
        Mail: e.target.Mail.value,
        Position: e.target.Position.value,
      });
      alert("Employee Added Successfully");
      setID("");
      setEmployment("");
      setMail("");
      setName("");
      setSalary("");
      setPosition("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <AdminHeader />
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        sx={{
          margin: "40px",
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ margin: "10px", width: "200px" }}>
            Enter Employee ID
          </Typography>
          <TextField
            id="ID"
            label="ID"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ margin: "10px", width: "200px" }}>
            Enter Employee Name
          </Typography>
          <TextField
            value={Name}
            onChange={(e) => setName(e.target.value)}
            id="Name"
            label="Name"
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ margin: "10px", width: "200px" }}>
            Enter Employee Position
          </Typography>
          <TextField
            value={Position}
            onChange={(e) => setPosition(e.target.value)}
            id="Position"
            label="Position"
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ margin: "10px", width: "200px" }}>
            Enter Employee's Base Salary
          </Typography>
          <TextField
            value={Salary}
            onChange={(e) => setSalary(e.target.value)}
            id="Salary"
            label="Salary"
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ margin: "10px", width: "200px" }}>
            Enter Employment Status
          </Typography>
          <TextField
            value={Employment}
            onChange={(e) => setEmployment(e.target.value)}
            id="Employment"
            label="Employment"
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ margin: "10px", width: "200px" }}>
            Enter Employee's Mail ID
          </Typography>
          <TextField
            value={Mail}
            onChange={(e) => setMail(e.target.value)}
            id="Mail"
            label="Mail"
            variant="outlined"
          />
        </Box>
        <Button type="submit">Submit</Button>
      </Box>
    </div>
  );
}

export default AddEmployee;
