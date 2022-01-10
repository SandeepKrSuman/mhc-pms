import { Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import UploadPrescriptionCard from "../../../Cards/UploadPrescriptionCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import jwt from "jsonwebtoken";
import api from "../../../../api";

function UploadPrescription() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [defMsg, setDefMsg] = useState("");

  useEffect(() => {
    async function fetchAppointments() {
      setOpenBackdrop(true);
      try {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const demail = payload.userType === "doctor" && payload.email;
        const res = await api.myAppointments();
        if (res.data.error) {
          setOpenBackdrop(false);
          alert(res.data.errorMsg);
        } else {
          setOpenBackdrop(false);
          const appoints = res.data.filter(
            (appoint) =>
              appoint.demail === demail && appoint.prescribed === false
          );
          setAppointments(appoints);
          setDefMsg(
            appoints.length === 0 && "**No Appointment to prescribe.**"
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

export default UploadPrescription;
