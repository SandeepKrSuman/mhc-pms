import { Fragment } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import PrescriptionCard from "../../../PrescriptionCard/PrescriptionCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const prs = [
  { doc: "Dr. S. Bakshi", file_url: "" },
  { doc: "Dr. S. Dey", file_url: "" },
  { doc: "Dr. S. Santra", file_url: "" },
];

function Prescriptions() {
  if (prs.length > 0) {
    return (
      <Fragment>
        <DashBar user={"PatientXyZ"} />
        <Container className="dash-container" maxWidth="md">
          <Grid container spacing={3}>
            {prs.map((prescription, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <PrescriptionCard
                    doc={prescription.doc}
                    file_url={prescription.file_url}
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
        <DashBar user={"UserXyZ"} />
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
