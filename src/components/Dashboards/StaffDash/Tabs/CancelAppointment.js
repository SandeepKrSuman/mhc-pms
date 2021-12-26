import { Fragment, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import AppointmentCard from "../../../Cards/AppointmentCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//search appointment using unique id and store in below array
const appointments = [
  { doc: "Dr. S. Bakshi", date: "12/08/2021" },
  { doc: "Dr. S. Dey", date: "12/10/2021" },
  { doc: "Dr. S. Santra", date: "12/20/2021" },
];

function CancelAppointment() {
  const [searched, setSearched] = useState(false);
  const [email, setEmail] = useState("");

  function handleChange(event) {
    const e = event.target.value;
    setEmail(e);
  }

  function handleSearch() {
    // search the email in db and return the appointmet list
    setSearched(true);
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
              label="Enter Email ID"
              type="email"
              value={email}
              onChange={handleChange}
              variant="outlined"
              autoComplete="off"
              sx={{ width: "90%" }}
            />
            <Button onClick={handleSearch} variant="outlined">
              Search
            </Button>
          </Stack>
        </Container>
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
                      doc={appointment.doc}
                      date={appointment.date}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
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
        </Fragment>
      );
    }
  }
}

export default CancelAppointment;
