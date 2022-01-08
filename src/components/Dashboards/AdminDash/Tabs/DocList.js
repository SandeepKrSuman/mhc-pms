import { Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import DocListCard from "../../../Cards/DocListCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import api from "../../../../api";

function DocList() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    async function fetchDocList() {
      setOpenBackdrop(true);
      try {
        const res = await api.docList();
        if (res.data.error) {
          setOpenBackdrop(false);
          alert(res.data.errorMsg);
        } else {
          setOpenBackdrop(false);
          setDocs(res.data);
        }
      } catch (error) {
        setOpenBackdrop(false);
        alert(error.response.data.errorMsg);
        console.log(error);
      }
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}

export default DocList;
