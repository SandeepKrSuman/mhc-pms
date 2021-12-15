import { Fragment } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StatsCard from "../../../Cards/StatsCard";
import DashBar from "../../../DashBar/DashBar";

function GenerateStats() {
  const mrd = "Dr. S. Bakshi";
  const stars = 5;
  const nop = 100;
  const dmwd = "Dr. Raman Raghav";
  const nos = 5;

  return (
    <Fragment>
      <DashBar user="AdminXyZ" />
      <Container className="dash-container" maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <StatsCard
              heading={mrd}
              subheading="Most Rated Doctor"
              star={stars}
            />
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
        </Grid>
      </Container>
    </Fragment>
  );
}

export default GenerateStats;
