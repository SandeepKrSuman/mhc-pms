import { Fragment, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import PrescriptionCard from "../../../Cards/PrescriptionCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import api from "../../../../api";

function Prescriptions() {
  const [prs, setPrs] = useState([]);

  useEffect(() => {
    async function fetchPrescriptions() {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const ptemail = payload.userType === "patient" && payload.email;
        const res = await api.prescriptions();
        if (res.data.error) {
          alert(res.data.errorMsg);
        } else {
          const prescs = res.data.filter((presc) => presc.pemail === ptemail);
          setPrs(prescs);
        }
      } catch (error) {
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
            **You have not been prescribed yet.**
          </Typography>
        </Container>
      </Fragment>
    );
  }
}

export default Prescriptions;
