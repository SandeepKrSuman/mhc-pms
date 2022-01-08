import { Fragment, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import AppointmentCard from "../../../Cards/AppointmentCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../../../api";

function CancelAppointment() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [searched, setSearched] = useState(false);
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function fetchAppointments() {
    setOpenBackdrop(true);
    if (!validateEmail(email)) {
      setOpenBackdrop(false);
      alert("Enter a valid email!");
      return;
    }
    try {
      const ptemail = email;
      const res = await api.myAppointments();
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        const appoints = res.data.filter(
          (appoint) => appoint.pemail === ptemail
        );
        setAppointments(appoints);
        setSearched(true);
      }
    } catch (error) {
      setOpenBackdrop(false);
      alert(error.response.data.errorMsg);
      console.log(error);
    }
  }

  function handleChange(event) {
    const e = event.target.value;
    setEmail(e);
  }

  if (!searched) {
    return (
      <Fragment>
        <DashBar />
        <Container sx={{ textAlign: "center" }}>
          <Stack
            spacing={0}
            direction="row"
            sx={{ marginTop: "30vh" }}
            justifyContent="center"
          >
            <TextField
              id="outlined-basic"
              label="Patient's Email Id"
              type="email"
              value={email}
              onChange={handleChange}
              variant="outlined"
              autoComplete="off"
              sx={{ width: "90%" }}
            />
            <Button onClick={fetchAppointments} variant="outlined">
              Search
            </Button>
          </Stack>
        </Container>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Fragment>
    );
  } else if (searched) {
    if (appointments.length > 0) {
      return (
        <Fragment>
          <DashBar />
          <Container className="dash-container" maxWidth="md">
            <Grid container spacing={3}>
              {appointments.map((appointment, index) => {
                return (
                  <Grid key={index} item xs={12}>
                    <AppointmentCard
                      doc={appointment.doctor}
                      date={appointment.date}
                      pemail={appointment.pemail}
                      demail={appointment.demail}
                      doa={appointment.doa}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <DashBar />
          <Container sx={{ textAlign: "center" }}>
            <Typography
              sx={{ marginTop: "30vh" }}
              variant="h5"
              gutterBottom
              component="div"
            >
              **Patient does NOT seem to have any appointment.**
            </Typography>
          </Container>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Fragment>
      );
    }
  }
}

export default CancelAppointment;
