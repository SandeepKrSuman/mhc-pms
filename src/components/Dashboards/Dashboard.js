import { Fragment } from "react";
import Container from "@mui/material/Container";
import DashBar from "../DashBar/DashBar";
import DashCard from "../Cards/DashCard";
import Grid from "@mui/material/Grid";
import "./Dashboard.css";

function Dashboard(props) {
  return (
    <Fragment>
      <DashBar />
      <Container className="dash-container" maxWidth="lg">
        <Grid container spacing={3}>
          {props.cards.map((cardFor, index) => {
            return (
              <Grid key={index} item xs={12} md={6} lg={props.lgspace}>
                <DashCard cardTitle={cardFor} from={props.from} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Dashboard;
