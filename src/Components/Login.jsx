import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

const defaultTheme = createTheme();

export default function Login() {
  const [userid, setUserid] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [adminMails, setAdminMails] = useState();
  const [empids, setEmpids] = useState();
  useEffect(() => {
    const fetch = async () => {
      const AdminCollectionRef = collection(db, "Admins");
      const EmpCollectionRef = collection(db, "Employees");
      const Admins = await getDocs(AdminCollectionRef);
      const Employees = await getDocs(EmpCollectionRef);
      let AdminList = [];
      let Emps = {};
      Admins.forEach((doc) => {
        AdminList.push(doc.data()["Mail"]);
      });
      Employees.forEach((doc) => {
        Emps[`${doc.data()["Mail"]}`] = doc.data()["ID"];
      });
      setAdminMails(AdminList);
      setEmpids(Emps);
    };
    fetch();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, userid, password);
      setStatus("success");
      if (adminMails.includes(userid)) {
        navigate("/auth/Admin-Dashboard");
      } else {
        navigate("/auth/User-Dashboard", { state: { ID: empids[userid] } });
      }
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={(event) => setUserid(event.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Typography>
                  {status == "success" ? "Logged in Successfully" : `${status}`}
                </Typography>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
