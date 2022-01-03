import { Fragment, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import FeedbackCard from "../../../Cards/FeedbackCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import api from "../../../../api";

function Feedback() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const ptemail = payload.userType === "patient" && payload.email;
        const res = await api.myAppointments();
        if (res.data.error) {
          alert(res.data.errorMsg);
        } else {
          const appoints = res.data.filter(
            (appoint) => appoint.pemail === ptemail
          );
          setAppointments(appoints);
        }
      } catch (error) {
        alert(error.response.data.errorMsg);
        console.log(error);
      }
    }
    fetchAppointments();
  }, []);

  if (appointments.length > 0) {
    return (
      <Fragment>
        <DashBar />
        <Container className="dash-container" maxWidth="md">
          <Grid container spacing={3}>
            {appointments.map((appointment, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <FeedbackCard
                    doc={appointment.doctor}
                    date={appointment.date}
                    pemail={appointment.pemail}
                    demail={appointment.demail}
                    doa={appointment.doa}
                    initialReview={appointment.review}
                    initialRating={appointment.rating}
                    feedbackAvailable={appointment.feedback}
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
            **You have not booked any appointment yet.**
          </Typography>
        </Container>
      </Fragment>
    );
  }
}

export default Feedback;
