import { Fragment, useEffect, useState } from "react";
import ViewFeedbackCard from "../../../Cards/ViewFeedbackCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashBar from "../../../DashBar/DashBar";
import api from "../../../../api";
import Typography from "@mui/material/Typography";

function Feedbacks() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [pf, setPf] = useState([]);
  const [defMsg, setDefMsg] = useState("");

  useEffect(() => {
    async function fetchFeedbacks() {
      setOpenBackdrop(true);
      try {
        const res = await api.patientFeedbacks();
        if (res.data.error) {
          setOpenBackdrop(false);
          alert(res.data.errorMsg);
        } else {
          setOpenBackdrop(false);
          setPf(res.data);
          setDefMsg(
            res.data.length === 0 && "**Nothing here. Feedback list empty.**"
          );
        }
      } catch (error) {
        setOpenBackdrop(false);
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

export default Feedbacks;
