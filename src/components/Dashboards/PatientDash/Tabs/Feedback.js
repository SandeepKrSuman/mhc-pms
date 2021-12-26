import { Fragment } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import FeedbackCard from "../../../Cards/FeedbackCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const appointments = [
  { doc: "Dr. S. Bakshi", date: "12/08/2021" },
  { doc: "Dr. S. Dey", date: "12/10/2021" },
  { doc: "Dr. S. Santra", date: "12/20/2021" },
];

function Feedback() {
  if (appointments.length > 0) {
    return (
      <Fragment>
        <DashBar />
        <Container className="dash-container" maxWidth="md">
          <Grid container spacing={3}>
            {appointments.map((appointment, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <FeedbackCard doc={appointment.doc} date={appointment.date} />
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
            **You have not booked any appointment yet.**
          </Typography>
        </Container>
      </Fragment>
    );
  }
}

export default Feedback;
