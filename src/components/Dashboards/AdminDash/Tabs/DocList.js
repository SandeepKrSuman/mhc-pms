import { Fragment } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import DocListCard from "../../../Cards/DocListCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const docs = [
  {
    heading: "Dr. S. Bakshi",
    subheading: "Mon | Tue | Wed",
    id: [1, 2, 3],
    fee: 1000,
  },
  {
    heading: "Dr. S. Dey",
    subheading: "Tue | Wed | Fri",
    id: [2, 3, 5],
    fee: 1000,
  },
  {
    heading: "Dr. B. Santra",
    subheading: "Mon | Tue | Fri | Sat",
    id: [1, 2, 5, 6],
    fee: 1500,
  },
  {
    heading: "Dr. A.K. Aryan",
    subheading: "Mon | Tue | Wed",
    id: [1, 2, 3],
    fee: 1000,
  },
  {
    heading: "Dr. Kanti Ghosh",
    subheading: "Fri | Sat | Sun",
    id: [5, 6, 0],
    fee: 1000,
  },
  {
    heading: "Dr. Satya N.",
    subheading: "Tue | Sat | Sun",
    id: [2, 6, 0],
    fee: 1000,
  },
  {
    heading: "Dr. B.K. Bandhu",
    subheading: "Thu | Fri | Sun",
    id: [4, 5, 0],
    fee: 1000,
  },
  {
    heading: "Dr. Kali Biswas",
    subheading: "Mon | Tue | Sat | Sun",
    id: [1, 2, 6, 0],
    fee: 1500,
  },
  {
    heading: "Dr. Raman Raghav",
    subheading: "Mon | Wed | Thu | Sat",
    id: [1, 3, 4, 6],
    fee: 1500,
  },
  { heading: "Dr. Deb Kumar", subheading: "Sat | Sun", id: [6, 0], fee: 800 },
  {
    heading: "Dr. S.M. Malik",
    subheading: "Mon | Thu | Sun",
    id: [1, 4, 0],
    fee: 1500,
  },
  {
    heading: "Dr. A.G. Gupta",
    subheading: "Wed | Thu | Fri",
    id: [3, 4, 5],
    fee: 1000,
  },
  {
    heading: "Dr. S. Goswami",
    subheading: "Wed | Thu | Fri",
    id: [3, 4, 5],
    fee: 800,
  },
  { heading: "Dr. R. Rey", subheading: "Thu", id: [4], fee: 800 },
];

function DocList(props) {
  return (
    <Fragment>
      <DashBar user={props.userName} />
      <Container className="dash-container" maxWidth="lg">
        <br />
        <Link
          style={{ textDecoration: "none" }}
          to="/dashboard/admin/doctors'-list/add-new"
        >
          <Button variant="outlined" startIcon={<AddIcon />} size="large">
            New
          </Button>
        </Link>
        <br /> <br />
        <Grid container spacing={3}>
          {docs.map((doc, index) => {
            return (
              <Grid key={index} item xs={12} md={4} lg={4}>
                <DocListCard
                  heading={doc.heading}
                  subheading={doc.subheading}
                  fee={doc.fee}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default DocList;
