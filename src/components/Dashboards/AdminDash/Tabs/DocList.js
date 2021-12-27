import { Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import DocListCard from "../../../Cards/DocListCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import api from "../../../../api";

function DocList() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    async function fetchDocList() {
      const res = await api.docList();
      setDocs(res.data);
    }
    fetchDocList();
  }, []);

  return (
    <Fragment>
      <DashBar />
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
          {docs.length > 0 &&
            docs.map((doc, index) => {
              return (
                <Grid key={index} item xs={12} md={4} lg={4}>
                  <DocListCard
                    heading={doc.docName}
                    degree={doc.degree}
                    subheading={doc.wdays}
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
