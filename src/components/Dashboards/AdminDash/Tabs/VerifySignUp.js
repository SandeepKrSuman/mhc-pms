import { Fragment, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import VerifyCard from "../../../Cards/VerifyCard";
import Grid from "@mui/material/Grid";
import api from "../../../../api";

function VerifySignUp() {
  const [unvUsers, setUnvUsers] = useState([]);

  useEffect(() => {
    async function fetchUnverified() {
      try {
        const res = await api.unverified();
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setUnvUsers(res.data);
        }
      } catch (error) {
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
    </Fragment>
  );
}

export default VerifySignUp;
