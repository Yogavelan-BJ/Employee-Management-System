import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import AdminHeader from "./AdminHeader";
import dayjs from "dayjs";

function AddEmployee() {
  const [ID, setID] = useState("");
  const [Name, setName] = useState("");
  const [Position, setPosition] = useState("");
  const [Employment, setEmployment] = useState("");
  const [Salary, setSalary] = useState("");
  const [Mail, setMail] = useState("");
  const [BasicSalary, setBasicSalary] = useState();
  const [HomeRentAllowance, setHRA] = useState();
  const [Allowance, setAllowance] = useState();
  const [Bonus, setBonus] = useState();
  const [ProvidentFund, setPF] = useState();
  const [ProfessionalTax, setPT] = useState();
  const [date, setDate] = useState(dayjs());

  const handleSubmit = async (e) => {
    try {
      await setDoc(doc(db, "Employees", `${e.target.ID.value}`), {
        ID: e.target.ID.value,
        Name: e.target.Name.value,
        Employment: e.target.Employment.value,
        Salary: e.target.Salary.value,
        Attendance: 1,
        Mail: e.target.Mail.value,
        Position: e.target.Position.value,
      });
      await setDoc(
        doc(db, `Employees/${e.target.ID.value}/EmployeeSalary`, "Splitup"),
        {
          BasicSalary,
          Bonus,
          Allowance,
          HomeRentAllowance,
          ProfessionalTax,
          ProvidentFund,
        }
      );
      await setDoc(
        doc(
          db,
          `Employees/${e.target.ID.value}/EmployeeAttendance`,
          `${date.date()}-${date.month() + 1}-${date.year()}`
        ),
        { Status: "present" }
      );
      alert("Employee Added Successfully");
      setID("");
      setEmployment("");
      setMail("");
      setName("");
      setSalary("");
      setPosition("");
      setAllowance(0);
      setBasicSalary(0);
      setPF(0);
      setPT(0);
      setBonus(0);
      setHRA(0);
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
            onChange={(e) => setSalary(Number(e.target.value))}
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
        <Box
          sx={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ margin: "10px", width: "200px" }}>
            Enter Employee's Basic Salary
          </Typography>
          <TextField
            value={BasicSalary}
            onChange={(e) => setBasicSalary(Number(e.target.value))}
            id="BasicSalary"
            label="Basic Salary"
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
            Enter Employee's HRA
          </Typography>
          <TextField
            value={HomeRentAllowance}
            onChange={(e) => setHRA(Number(e.target.value))}
            id="HRA"
            label="HRA"
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
            Enter Employee's Other Allowances
          </Typography>
          <TextField
            value={Allowance}
            onChange={(e) => setAllowance(Number(e.target.value))}
            id="Allowance"
            label="Other Allowances"
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
            Enter Employee's Bonus
          </Typography>
          <TextField
            value={Bonus}
            onChange={(e) => setBonus(Number(e.target.value))}
            id="Bonus"
            label="Bonus"
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
            Enter Employee's PF
          </Typography>
          <TextField
            value={ProvidentFund}
            onChange={(e) => setPF(Number(e.target.value))}
            id="ProvidentFund"
            label="Provident Fund"
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
            Enter Employee's PT
          </Typography>
          <TextField
            value={ProfessionalTax}
            onChange={(e) => setPT(Number(e.target.value))}
            id="ProfessionalTax"
            label="Professional Tax"
            variant="outlined"
          />
        </Box>
        <Button type="submit">Submit</Button>
      </Box>
    </div>
  );
}

export default AddEmployee;
