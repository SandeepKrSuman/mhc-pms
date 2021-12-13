import { Fragment } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import UploadPrescriptionCard from "../../../Cards/UploadPrescriptionCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const appointments = [
  { patient: "Bakshi", date: "12/08/2021" },
  { patient: "Dey", date: "12/10/2021" },
  { patient: "Santra", date: "12/20/2021" },
];

function UploadPrescription() {
  if (appointments.length > 0) {
    return (
      <Fragment>
        <DashBar user={"PatientXyZ"} />
        <Container className="dash-container" maxWidth="md">
          <Grid container spacing={3}>
            {appointments.map((apmt, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <UploadPrescriptionCard patient={apmt.patient} />
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
        <DashBar user={"UserXyZ"} />
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