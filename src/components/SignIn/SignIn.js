import * as React from "react";
import { AuthContext } from "../../App";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../api";
import "./SignIn.css";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  const auth = React.useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const sparam = searchParams.get("new");
  const [succOpen, setSuccOpen] = React.useState(sparam ? true : false);
  const [errOpen, setErrOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(
    "An Error Occured. Try again later."
  );

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrOpen(false);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccOpen(false);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    setOpenBackdrop(true);
    event.preventDefault();
    const postData = {
      email: email,
      password: password,
    };

    try {
      const res = await api.signin(postData);
      if (res.data.error) {
        setOpenBackdrop(false);
        setErrorMsg(res.data.errorMsg);
        setErrOpen(true);
      } else {
        const loggedUser = res.data.userType;
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setOpenBackdrop(false);
        auth.setUserType(loggedUser);
      }
    } catch (error) {
      setOpenBackdrop(false);
      setErrorMsg(error.response.data.errorMsg);
      setErrOpen(true);
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
            src="/images/brain.png"
            sx={{ width: 56, height: 56 }}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} validate sx={{ mt: 1 }}>
            <br /> <br />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={handleEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              autoComplete="current-password"
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
              <Grid item xs></Grid>
              <Grid item>
                <Link className="link-btn-login" to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        key={"success"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={succOpen}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registration Successful. Go ahead and login...
        </Alert>
      </Snackbar>
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
