import { Fragment, useEffect, useState } from "react";
import ViewFeedbackCard from "../../../Cards/ViewFeedbackCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DashBar from "../../../DashBar/DashBar";
import api from "../../../../api";
import Typography from "@mui/material/Typography";

function Feedbacks() {
  const [pf, setPf] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await api.patientFeedbacks();
        if (res.data.error) {
          alert(res.data.errorMsg);
        } else {
          setPf(res.data);
        }
      } catch (error) {
        alert(error.response.data.errorMsg);
        console.log(error);
      }
    }

    fetchFeedbacks();
  }, []);

  if (pf.length > 0) {
    return (
      <Fragment>
        <DashBar />
        <Container className="dash-container" maxWidth="lg">
          <br />
          <Grid container spacing={3}>
            {pf.map((pfb, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <ViewFeedbackCard
                    heading={pfb.review}
                    subheading={`by: ${pfb.patient} <${pfb.pemail}>`}
                    rating={pfb.rating}
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
            **Nothing here. Feedback list empty.**
          </Typography>
        </Container>
      </Fragment>
    );
  }
}

export default Feedbacks;
