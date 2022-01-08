import { forwardRef, useState, useEffect } from "react";
import api from "../../api";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import "./SignUp.css";

const theme = createTheme();

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [user, setUser] = useState("patient");
  const [degree, setDegree] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errOpen, setErrOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "An Error Occured. Try again later."
  );

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrOpen(false);
  };

  const handleUserType = (event) => {
    setUser(event.target.value);
  };
  const handleFname = (event) => {
    setFname(event.target.value);
  };
  const handleLname = (event) => {
    setLname(event.target.value);
  };
  const handleDegree = (event) => {
    setDegree(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpenBackdrop(true);

    const verified = user === "patient" ? true : false;
    const deg = user === "doctor" ? degree : "N/A";

    const postData = {
      userType: user,
      fname: fname,
      lname: lname,
      degr: deg,
      email: email,
      password: password,
      verified: verified,
    };

    try {
      const res = await api.signup(postData);
      if (res.data.error) {
        setOpenBackdrop(false);
        setErrorMsg(res.data.errorMsg);
        setErrOpen(true);
        setUser("patient");
        setFname("");
        setLname("");
        setDegree("");
        setEmail("");
        setPassword("");
      } else {
        setOpenBackdrop(false);
        navigate({
          pathname: "/signin",
          search: `?${createSearchParams({ new: true })}`,
        });
      }
    } catch (error) {
      setOpenBackdrop(false);
      setErrorMsg(error.response.data.errorMsg);
      setErrOpen(true);
      setUser("patient");
      setFname("");
      setLname("");
      setDegree("");
      setEmail("");
      setPassword("");
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar
            alt="Remy Sharp"
            src="/images/brainsig.png"
            sx={{ width: 56, height: 56 }}
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="User Type"
                  value={user}
                  name="user-type"
                  onChange={handleUserType}
                >
                  <MenuItem value={"patient"} selected>
                    Patient
                  </MenuItem>
                  <MenuItem value={"staff"}>Reception Staff</MenuItem>
                  <MenuItem value={"doctor"}>Doctor</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fname}
                  autoFocus
                  onChange={handleFname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lname}
                  autoComplete="family-name"
                  onChange={handleLname}
                />
              </Grid>
              {user === "doctor" && (
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="degree"
                    required
                    fullWidth
                    id="degree"
                    label="Degree"
                    value={degree}
                    onChange={handleDegree}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  type="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="link-btn-login" to="/signin">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        key={"error"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
