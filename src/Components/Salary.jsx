import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function Salary({ ID }) {
  const [DispSalary, setSalary] = useState(Number(696969));
  const [IncrementEnabled, setIncrementEnabled] = useState(false);
  const [IncrementPercent, setIncrementPercent] = useState(0);
  const handleIncrement = () => {
    setSalary(DispSalary + (DispSalary / 100) * IncrementPercent);
    alert("Salary Updated");
  };
  return (
    <>
      <Box sx={{ border: "1px solid grey", margin: "20px" }}>
        <Typography>Current Salary : Rs.{DispSalary}/- Per Annum</Typography>
        <Button
          disabled={IncrementEnabled}
          onClick={() => setIncrementEnabled((prev) => !prev)}
        >
          Increment
        </Button>
        {IncrementEnabled ? (
          <>
            <TextField
              type="number"
              value={IncrementPercent}
              onChange={(e) => setIncrementPercent(e.target.value)}
              id="Increment"
              label="Increment Percent"
              variant="outlined"
            />
            <Button onClick={() => handleIncrement()}>Save Changes</Button>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default Salary;
