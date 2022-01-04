import React, { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import DashBar from "../../../DashBar/DashBar";
import Dashboard from "../../Dashboard";
import { useSearchParams } from "react-router-dom";
import api from "../../../../api";
import jwt from "jsonwebtoken";
import DuePaymentCard from "../../../Cards/DuePaymentCard";
import Typography from "@mui/material/Typography";

export const PaymentContext = React.createContext();

const cardTitles = ["Card Payment", "UPI Payment"];

function MakePaymentPatinet() {
  const [dues, setDues] = useState([]);

  const [searchParams] = useSearchParams();
  const pemail = searchParams ? searchParams.get("pemail") : null;
  const demail = searchParams ? searchParams.get("demail") : null;
  const doa = searchParams ? searchParams.get("doa") : null;

  useEffect(() => {
    async function fetchUnpaid() {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const ptemail = payload.userType === "patient" && payload.email;
        const res = await api.duePayment();
        if (res.data.error) {
          alert(res.data.errorMsg);
        } else {
          const myUnpaid = res.data.filter((unp) => unp.pemail === ptemail);
          setDues(myUnpaid);
        }
      } catch (error) {
        alert(error.response.data.errorMsg);
        console.log(error);
      }
    }
    fetchUnpaid();
  }, []);

  if (pemail && demail && doa) {
    return (
      <PaymentContext.Provider value={{ pemail, demail, doa }}>
        <Dashboard cards={cardTitles} lgspace={6} />
      </PaymentContext.Provider>
    );
  } else {
    if (dues.length > 0) {
      return (
        <Fragment>
          <DashBar />
          <Container className="dash-container" maxWidth="md">
            <Grid container spacing={3}>
              {dues.map((due, index) => {
                return (
                  <Grid key={index} item xs={12}>
                    <DuePaymentCard
                      key={index}
                      pemail={due.pemail}
                      demail={due.demail}
                      doa={due.doa}
                      doc={due.doctor}
                      date={due.date}
                      caller="patient"
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
          <DashBar />
          <Container sx={{ textAlign: "center" }}>
            <Typography
              sx={{ marginTop: "30vh" }}
              variant="h5"
              gutterBottom
              component="div"
            >
              **All clear here. None of your payment is due.**
            </Typography>
          </Container>
        </Fragment>
      );
    }
  }
}

export default MakePaymentPatinet;
