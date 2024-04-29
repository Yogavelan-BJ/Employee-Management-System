import { Box, Button, TextField, Typography } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

function Salary(props) {
  const [IncrementEnabled, setIncrementEnabled] = useState(false);
  const [BSIncrementPercent, setBSIncrementPercent] = useState(0);
  const [HRAIncrementPercent, setHRAIncrementPercent] = useState(0);
  const [ALLIncrementPercent, setALLIncrementPercent] = useState(0);
  const [BONIncrementPercent, setBONIncrementPercent] = useState(0);
  const [PFPercent, setPFPercent] = useState(12);
  const [basicSalary, setBasicSalary] = useState(props.props.BasicSalary);
  const [HRA, setHRA] = useState(props.props.HomeRentAllowance);
  const [allowance, setAllowance] = useState(props.props.Allowance);
  const [bonus, setBonus] = useState(props.props.Bonus);
  const [PF, setPF] = useState(props.props.ProvidentFund);
  const [PT, setPT] = useState(props.props.ProfessionalTax);

  const handleIncrement = () => {
    setBasicSalary(basicSalary + (basicSalary / 100) * BSIncrementPercent);
    setHRA(HRA + (HRA / 100) * HRAIncrementPercent);
    setAllowance(allowance + (allowance / 100) * ALLIncrementPercent);
    setBonus(bonus + (bonus / 100) * BONIncrementPercent);
    setPF((basicSalary * PFPercent) / 100);
  };
  const updateSal = async () => {
    const SalDocRef = doc(
      db,
      `Employees/${props.props.ID}/EmployeeSalary`,
      "Splitup"
    );
    try {
      await updateDoc(SalDocRef, {
        BasicSalary: basicSalary,
        HomeRentAllowance: HRA,
        Allowance: allowance,
        Bonus: bonus,
        ProvidentFund: PF,
        ProfessionalTax: PT,
      });
      alert("Salary Updated Successfully");
      setIncrementEnabled(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Box sx={{ border: "1px solid grey", margin: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <Button
            sx={{ width: "100%", fontSize: "20px" }}
            disabled={IncrementEnabled}
            onClick={() => setIncrementEnabled((prev) => !prev)}
          >
            Make Salary Changes
          </Button>
        </Box>

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
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography sx={{ margin: "10px", width: "200px" }}>
              Basic Salary
            </Typography>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography sx={{ marginRight: "3px" }}>Rs.</Typography>
              <TextField
                disabled={IncrementEnabled ? false : true}
                id="BasicSal"
                label="Basic Salary"
                type="number"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                variant="outlined"
              />
              {IncrementEnabled ? (
                <>
                  <TextField
                    type="Number"
                    value={BSIncrementPercent}
                    onChange={(e) =>
                      setBSIncrementPercent(Number(e.target.value))
                    }
                    id="Increment"
                    label="Increment Percent"
                    variant="outlined"
                    sx={{ marginLeft: "10px" }}
                  />
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography sx={{ margin: "10px", width: "200px" }}>
              Home Rent Allowance
            </Typography>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography sx={{ marginRight: "3px" }}>Rs.</Typography>
              <TextField
                disabled={IncrementEnabled ? false : true}
                id="HRA"
                label="HRA"
                onChange={(e) => setHRA(Number(e.target.value))}
                type="number"
                value={HRA}
                variant="outlined"
              />
              {IncrementEnabled ? (
                <>
                  <TextField
                    type="Number"
                    value={HRAIncrementPercent}
                    onChange={(e) =>
                      setHRAIncrementPercent(Number(e.target.value))
                    }
                    id="Increment"
                    label="Increment Percent"
                    variant="outlined"
                    sx={{ marginLeft: "10px" }}
                  />
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography sx={{ margin: "10px", width: "200px" }}>
              Other Allowances
            </Typography>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography sx={{ marginRight: "3px" }}>Rs.</Typography>
              <TextField
                disabled={IncrementEnabled ? false : true}
                onChange={(e) => setAllowance(Number(e.target.value))}
                id="Allowance"
                label="Other Allowances"
                type="number"
                value={allowance}
                variant="outlined"
              />
              {IncrementEnabled ? (
                <>
                  <TextField
                    type="Number"
                    value={ALLIncrementPercent}
                    onChange={(e) =>
                      setALLIncrementPercent(Number(e.target.value))
                    }
                    id="Increment"
                    label="Increment Percent"
                    variant="outlined"
                    sx={{ marginLeft: "10px" }}
                  />
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography sx={{ margin: "10px", width: "200px" }}>
              Bonus
            </Typography>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography sx={{ marginRight: "3px" }}>Rs.</Typography>
              <TextField
                disabled={IncrementEnabled ? false : true}
                onChange={(e) => setBonus(Number(e.target.value))}
                id="Bonus"
                label="Bonus"
                type="number"
                value={bonus}
                variant="outlined"
              />
              {IncrementEnabled ? (
                <>
                  <TextField
                    type="Number"
                    value={BONIncrementPercent}
                    onChange={(e) =>
                      setBONIncrementPercent(Number(e.target.value))
                    }
                    id="Increment"
                    label="Increment Percent"
                    variant="outlined"
                    sx={{ marginLeft: "10px" }}
                  />
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography sx={{ margin: "10px", width: "200px" }}>
              Provident Fund
            </Typography>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography sx={{ marginRight: "3px" }}>Rs.</Typography>
              <TextField
                disabled={IncrementEnabled ? false : true}
                onChange={(e) => setPF(Number(e.target.value))}
                id="PF"
                label="PF"
                type="Number"
                value={PF}
                variant="outlined"
              />
              {IncrementEnabled ? (
                <>
                  <TextField
                    type="Number"
                    value={PFPercent}
                    onChange={(e) => setPFPercent(Number(e.target.value))}
                    id="Increment"
                    label="PF Percent"
                    variant="outlined"
                    sx={{ marginLeft: "10px" }}
                  />
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography sx={{ margin: "10px", width: "200px" }}>
              Professional Tax
            </Typography>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Typography sx={{ marginRight: "3px" }}>Rs.</Typography>
              <TextField
                disabled={IncrementEnabled ? false : true}
                id="PT"
                label="PT"
                type="Number"
                value={PT}
                onChange={(e) => setPT(Number(e.target.value))}
                variant="outlined"
              />
            </Box>
          </Box>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography sx={{ margin: "10px", width: "200px" }}>
              Total Deduction
            </Typography>
            <Typography>Rs.{Number(PF) + Number(PT)}/-</Typography>
          </Box>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography sx={{ margin: "10px", width: "200px" }}>
              Net Salary
            </Typography>
            <Typography>
              Rs.{basicSalary + HRA + bonus + allowance - PF - PT}/-
            </Typography>
          </Box>
          {IncrementEnabled ? (
            <>
              <Button
                sx={{ width: "100%", fontSize: "20px" }}
                onClick={() => {
                  handleIncrement();
                }}
              >
                Save Changes
              </Button>
              <Button
                sx={{ width: "100%", fontSize: "20px" }}
                onClick={() => {
                  updateSal();
                }}
              >
                Update Salary
              </Button>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Salary;
