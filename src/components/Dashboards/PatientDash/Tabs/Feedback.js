import { Fragment, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import FeedbackCard from "../../../Cards/FeedbackCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../../../api";

function Feedback() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [defMsg, setDefMsg] = useState("");

  useEffect(() => {
    const dateInPast = (firstDate, secondDate) => {
      if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
        return true;
      }
      return false;
    };

    async function fetchAppointments() {
      setOpenBackdrop(true);
      try {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const ptemail = payload.userType === "patient" && payload.email;
        const res = await api.myAppointments();
        if (res.data.error) {
          setOpenBackdrop(false);
          alert(res.data.errorMsg);
        } else {
          setOpenBackdrop(false);
          const appoints = res.data.filter(
            (appoint) =>
              appoint.pemail === ptemail &&
              dateInPast(new Date(parseInt(appoint.doa)), new Date())
          );
          setAppointments(appoints);
          setDefMsg(
            appoints.length === 0 &&
              "**You have not booked any appointment yet.**"
          );
        }
      } catch (error) {
        setOpenBackdrop(false);
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
            {defMsg}
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

export default Feedback;
