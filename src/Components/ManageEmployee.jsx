import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Button, Checkbox, Typography } from "@mui/material";

function ManageEmployee() {
  const loc = useLocation();
  const [checked, setChecked] = useState(true);
  const [date, setDate] = React.useState(dayjs());
  const { ID, Name, Attendance, Position, Salary, Mail, Employment } =
    loc.state;
  const data = [
    { value: Attendance, label: "Present" },
    { value: 100 - Attendance, label: "Absent" },
  ];

  const size = {
    width: 400,
    height: 200,
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleAttSubmit = () => {
    console.log(date, checked ? "present" : "absent");
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
      <Box sx={{ display: "flex" }}>
        <Box>
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
        </Box>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
    </div>
  );
}

export default ManageEmployee;
