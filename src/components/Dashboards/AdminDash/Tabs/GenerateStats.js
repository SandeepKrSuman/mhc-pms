import { Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StatsCard from "../../../Cards/StatsCard";
import DashBar from "../../../DashBar/DashBar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../../../api";

function GenerateStats() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [mrd, setMrd] = useState("");
  const [nop, setNop] = useState(null);
  const [dmwd, setDmwd] = useState("");
  const [nos, setNos] = useState(null);
  const [nod, setNod] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      setOpenBackdrop(true);
      try {
        const res = await api.generateStats();
        if (res.data.error) {
          setOpenBackdrop(false);
          alert(res.data.errorMsg);
        } else {
          setOpenBackdrop(false);
          setMrd(res.data.mrd);
          setNop(res.data.nop);
          setDmwd(res.data.dmwd);
          setNos(res.data.nos);
          setNod(res.data.nod);
        }
      } catch (error) {
        setOpenBackdrop(false);
        alert(error.response.data.errorMsg);
        console.log(error);
      }
    }

    fetchStats();
  }, []);

  return (
    <Fragment>
      <DashBar />
      <Container className="dash-container" maxWidth="lg">
        <br />
        <Link
          style={{ textDecoration: "none" }}
          to="/dashboard/admin/generate-stats/feedbacks"
        >
          <Button variant="outlined" startIcon={<FeedbackIcon />} size="large">
            Patient Feedbacks
          </Button>
        </Link>
        <br /> <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <StatsCard heading={mrd} subheading="Most Rated Doctor" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <StatsCard heading={nop} subheading="Patients visited so far" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <StatsCard
              heading={dmwd}
              subheading="with most number of working days"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <StatsCard
              heading={nos}
              subheading="Number of verified reception staffs"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <StatsCard heading={nod} subheading="Number of verified doctors" />
          </Grid>
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
}

export default GenerateStats;
