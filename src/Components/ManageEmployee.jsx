import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import SalaryComp from "./Salary";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function ManageEmployee() {
  const [SalaryData, setSalaryData] = useState();
  useEffect(() => {
    const getdata = async () => {
      const docRef = doc(db, `/Employees/${ID}/EmployeeSalary`, "Splitup");
      const docSnap = await getDoc(docRef);
      setSalaryData(docSnap.data());
    };
    getdata();
  }, []);
  const loc = useLocation();
  const [checked, setChecked] = useState(true);
  const [date, setDate] = useState(dayjs());
  const [isdisabled, setIsDisabled] = useState(true);
  const { ID, Name, Attendance, Position, Salary, Mail, Employment } =
    loc.state;
  const [DispName, setName] = useState(Name);
  const [DispPosition, setPosition] = useState(Position);
  const [DispEmployment, setEmployment] = useState(Employment);
  const [DispMail, setMail] = useState(Mail);
  const data = [
    { value: Attendance, label: "Present" },
    { value: 100 - Attendance, label: "Absent" },
  ];
  const docRef = doc(db, "Employees", `${ID}`);

  const size = {
    width: 400,
    height: 200,
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleAttSubmit = async () => {
    const SelectedDate = `${date.date()}-${date.month() + 1}-${date.year()}`;
    const AttDocRef = doc(
      db,
      `Employees/${ID}/EmployeeAttendance`,
      SelectedDate
    );
    try {
      await updateDoc(AttDocRef, { Status: checked ? "present" : "absent" });
      alert("Attendance Updated Successfully");
    } catch (err) {
      await setDoc(
        doc(db, `Employees/${ID}/EmployeeAttendance`, SelectedDate),
        {
          Status: checked ? "present" : "absent",
        }
      );
      alert("Attendance Marked Successfully");
    }
  };

  const handleProfileSubmit = async () => {
    setIsDisabled((prev) => !prev);
    await updateDoc(docRef, {
      Name: DispName,
      Position: DispPosition,
      Employment: DispEmployment,
      Mail: DispMail,
    });
    alert("Changes Successful");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AdminHeader />
      <Box sx={{ margin: "20px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ margin: "20px", display: "flex" }}>
          <Box sx={{ border: "1px solid grey", padding: "20px" }}>
            <div style={{ display: "flex" }}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                src="/broken-image.jpg"
              />
              <Button
                onClick={() => setIsDisabled((prev) => !prev)}
                sx={{ marginLeft: "120px" }}
              >
                Edit Profile
              </Button>
            </div>

            <Box
              sx={{
                margin: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ margin: "10px", width: "200px" }}>
                Employee ID
              </Typography>
              <TextField
                disabled={true}
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
                Employee Name
              </Typography>
              <TextField
                disabled={isdisabled}
                value={DispName}
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
                Employee Position
              </Typography>
              <TextField
                disabled={isdisabled}
                value={DispPosition}
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
                Employment Status
              </Typography>
              <TextField
                disabled={isdisabled}
                value={DispEmployment}
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
                Employee's Mail ID
              </Typography>
              <TextField
                disabled={isdisabled}
                value={DispMail}
                onChange={(e) => setMail(e.target.value)}
                id="Mail"
                label="Mail"
                variant="outlined"
              />
            </Box>
            {isdisabled ? (
              <></>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button onClick={handleProfileSubmit}>Save Changes</Button>
              </div>
            )}
          </Box>
          <Box
            sx={{
              border: "1px solid grey",
              padding: "10px",
              display: "flex",
              margin: "10px",
              flexGrow: 1,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value}%`,
                  arcLabelMinAngle: 45,
                  data,
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

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleAttSubmit();
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar"]}>
                  <DemoItem>
                    <DateCalendar
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Present
                </Typography>
                <Checkbox checked={checked} onChange={handleChange} />
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Absent
                </Typography>
                <Checkbox checked={!checked} onChange={handleChange} />
                <Button type="submit">Mark Attendance</Button>
              </Box>
            </form>
          </Box>
        </Box>
        {SalaryData ? <SalaryComp props={{ ...SalaryData, ID: ID }} /> : <></>}
      </Box>
    </div>
  );
}

export default ManageEmployee;
