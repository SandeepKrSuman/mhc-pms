import { Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import VerifyCard from "../../../Cards/VerifyCard";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../../../api";

function VerifySignUp() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [unvUsers, setUnvUsers] = useState([]);

  useEffect(() => {
    async function fetchUnverified() {
      setOpenBackdrop(true);
      try {
        const res = await api.unverified();
        if (res.data.error) {
          setOpenBackdrop(false);
          alert(res.data.error);
        } else {
          setOpenBackdrop(false);
          setUnvUsers(res.data);
        }
      } catch (error) {
        setOpenBackdrop(false);
        alert(error.response.data.errorMsg);
        console.log(error);
      }
    }
    fetchUnverified();
  }, []);

  return (
    <Fragment>
      <DashBar />
      <Container className="dash-container" maxWidth="lg">
        <br />
        <Grid container spacing={3}>
          {unvUsers.length > 0 &&
            unvUsers.map((unv, index) => {
              return (
                <Grid key={index} item xs={12} md={4} lg={4}>
                  <VerifyCard
                    heading={
                      unv.userType === "doctor"
                        ? `Dr. ${unv.fname} ${unv.lname}`
                        : `${unv.fname} ${unv.lname}`
                    }
                    degree={unv.degree}
                    subheading={unv.email}
                    unvuser={unv.userType}
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

export default VerifySignUp;
