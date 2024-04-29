import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase-config";
import UserHeader from "./UserHeader.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Avatar,
  Badge,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";

function UserDashboard() {
  const loc = useLocation();
  const size = {
    width: 400,
    height: 200,
  };
  const [attendanceData, setAttendanceData] = useState({});
  const [salaryData, setSalaryData] = useState({});
  const [generalData, setGeneralData] = useState({});
  const [attendancePieChartData, setAttendancePieChartData] = useState([]);
  const [SalaryPieChartData, setSalaryPieChartData] = useState([]);
  useEffect(() => {
    const read = async () => {
      const fetchedGeneralData = await getDoc(
        doc(db, "Employees", loc.state.ID)
      );
      const fetchedAttendanceData = await getDocs(
        collection(db, `Employees/${loc.state.ID}/EmployeeAttendance`)
      );
      const fetchedSalaryData = await getDoc(
        doc(db, `Employees/${loc.state.ID}/EmployeeSalary`, "Splitup")
      );
      const Att = {};
      let presentCount = 0;
      let absentCount = 0;
      fetchedAttendanceData.forEach((doc) => {
        if (doc.data()["Status"] == "present") {
          presentCount += 1;
        } else {
          absentCount += 1;
        }
        Att[doc.id] = doc.data()["Status"];
      });
      setAttendanceData(Att);
      setGeneralData(fetchedGeneralData.data());
      setSalaryData(fetchedSalaryData.data());
      setAttendancePieChartData([
        { value: presentCount, label: "Present" },
        { value: absentCount, label: "Absent" },
      ]);
      setSalaryPieChartData([
        {
          value: fetchedSalaryData.data()["BasicSalary"],
          label: "Basic Salary",
        },
        { value: fetchedSalaryData.data()["HomeRentAllowance"], label: "HRA" },
        { value: fetchedSalaryData.data()["Bonus"], label: "Bonus" },
        {
          value: fetchedSalaryData.data()["Allowance"],
          label: "Other Allowances",
        },
      ]);
    };
    read();
  }, []);
  return (
    <div>
      <UserHeader />
      <Box
        sx={{
          margin: "10px",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box
            sx={{
              padding: "20px",
              border: "1px solid grey",
              borderRadius: "10px",
              margin: "10px",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label} (${item.value})`,
                  arcLabelMinAngle: 45,
                  data: attendancePieChartData,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
              {...size}
            />
            <Box sx={{ width: "50%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "20px",
              border: "1px solid grey",
              borderRadius: "10px",
              margin: "10px",
              width: "500px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: "200px", height: "200px" }} />
              <Typography sx={{ margin: "10px" }} variant="h5">
                Your Profile
              </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ width: "500px" }}>
              <Table sx={{ maxWidth: 500 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>{generalData.ID}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{generalData.Name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Position</TableCell>
                    <TableCell>{generalData.Position}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Employment Status</TableCell>
                    <TableCell>{generalData.Employment}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact</TableCell>
                    <TableCell>{generalData.Mail}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "20px",
            border: "1px solid grey",
            borderRadius: "10px",
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              border: "1px solid grey",
              borderRadius: "10px",
              margin: "10px",
              width: "500px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ margin: "10px" }} variant="h5">
                Salary Split Up
              </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ width: "500px" }}>
              <Table sx={{ maxWidth: 500 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>Basic Salary</TableCell>
                    <TableCell>Rs.{salaryData.BasicSalary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Home Rent Allowance</TableCell>
                    <TableCell>Rs.{salaryData.HomeRentAllowance}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Other Allowances</TableCell>
                    <TableCell>Rs.{salaryData.Allowance}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bonus</TableCell>
                    <TableCell>Rs.{salaryData.Bonus}</TableCell>
                  </TableRow>
                  <TableRow>
                    <Typography variant="h6" sx={{ margin: "14px" }}>
                      Deductions
                    </Typography>
                  </TableRow>
                  <TableRow>
                    <TableCell>Provident Fund</TableCell>
                    <TableCell>Rs.{salaryData.ProvidentFund}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Professional Tax</TableCell>
                    <TableCell>Rs.{salaryData.ProfessionalTax}</TableCell>
                  </TableRow>
                  <TableRow>
                    <Typography variant="h6" sx={{ margin: "14px" }}>
                      Net Salary
                    </Typography>
                  </TableRow>
                  <TableRow>
                    <TableCell>Excluding Income Tax</TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        Rs.
                        {salaryData.BasicSalary +
                          salaryData.Bonus +
                          salaryData.Allowance +
                          salaryData.HomeRentAllowance -
                          salaryData.ProfessionalTax -
                          salaryData.ProvidentFund}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label}`,
                arcLabelMinAngle: 45,
                data: SalaryPieChartData,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
            {...{ width: 600, height: 300 }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default UserDashboard;
