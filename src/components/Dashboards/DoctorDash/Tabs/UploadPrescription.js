import { Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import UploadPrescriptionCard from "../../../Cards/UploadPrescriptionCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import jwt from "jsonwebtoken";
import api from "../../../../api";

function UploadPrescription() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const demail = payload.userType === "doctor" && payload.email;
        const res = await api.myAppointments();
        if (res.data.error) {
          alert(res.data.errorMsg);
        } else {
          const appoints = res.data.filter(
            (appoint) =>
              appoint.demail === demail && appoint.prescribed === false
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
            {appointments.map((apmt, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <UploadPrescriptionCard
                    useKey={index}
                    patient={apmt.patient}
                    date={apmt.date}
                    pemail={apmt.pemail}
                    demail={apmt.demail}
                    doa={apmt.doa}
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
            **No Appointment to prescribe.**
          </Typography>
        </Container>
      </Fragment>
    );
  }
}

export default UploadPrescription;
