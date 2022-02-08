import { Fragment, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import PrescriptionCard from "../../../Cards/PrescriptionCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../../../api";

function Prescriptions() {
  const [prs, setPrs] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [defMsg, setDefMsg] = useState("");

  useEffect(() => {
    async function fetchPrescriptions() {
      setOpenBackdrop(true);
      try {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const ptemail = payload.userType === "patient" && payload.email;
        const res = await api.prescriptions();
        if (res.data.error) {
          setOpenBackdrop(false);
          alert(res.data.errorMsg);
        } else {
          setOpenBackdrop(false);
          const prescs = res.data.filter((presc) => presc.pemail === ptemail);
          setPrs(prescs.reverse());
          setDefMsg(
            prescs.length === 0 && "**You have not been prescribed yet.**"
          );
        }
      } catch (error) {
        setOpenBackdrop(false);
        alert(error.response.data.errorMsg);
        console.log(error);
      }
    }
    fetchPrescriptions();
  }, []);

  if (prs.length > 0) {
    return (
      <Fragment>
        <DashBar />
        <Container className="dash-container" maxWidth="md">
          <Grid container spacing={3}>
            {prs.map((prescription, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <PrescriptionCard
                    doc={prescription.doctor}
                    file_url={prescription.file}
                    date={prescription.date}
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

export default Prescriptions;
