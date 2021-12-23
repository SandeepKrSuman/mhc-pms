import { Fragment } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import VerifyCard from "../../../Cards/VerifyCard";
import Grid from "@mui/material/Grid";

const unverified = [
  {
    fname: "S.",
    lname: "Bakshi",
    user: "doctor",
    email: "bakshi@hi.ro",
    verified: false,
  },
  {
    fname: "S.",
    lname: "Dey",
    user: "doctor",
    email: "dey@hi.ro",
    verified: false,
  },
  {
    fname: "B.",
    lname: "Rey",
    user: "staff",
    email: "rey@hi.ro",
    verified: false,
  },
  {
    fname: "R.",
    lname: "Ranu",
    user: "staff",
    email: "ranu@hi.ro",
    verified: false,
  },
];

function VerifySignUp() {
  return (
    <Fragment>
      <DashBar />
      <Container className="dash-container" maxWidth="lg">
        <br />
        <Grid container spacing={3}>
          {unverified.map((unv, index) => {
            return (
              <Grid key={index} item xs={12} md={4} lg={4}>
                <VerifyCard
                  heading={
                    unv.user === "doctor"
                      ? `Dr. ${unv.fname} ${unv.lname}`
                      : `${unv.fname} ${unv.lname}`
                  }
                  subheading={unv.email}
                  unvuser={unv.user}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default VerifySignUp;
