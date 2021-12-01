import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Link} from "react-router-dom";
import './SignIn.css';


const theme = createTheme();

export default function SignIn() {

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const [user, setUser] = React.useState('patient');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleUserType = (event) => {
    setUser(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      user: data.get('user-type'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="User Type"
              value={user}
              name="user-type"
              onChange={handleUserType}
            >
              <MenuItem value={"patient"} selected>Patient</MenuItem>
              <MenuItem value={"staff"}>Reception Staff</MenuItem>
              <MenuItem value={"doctor"}>Doctor</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
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
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link className="link-btn-login" to="/signup">
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
