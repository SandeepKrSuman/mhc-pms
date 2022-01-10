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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const PaymentContext = React.createContext();

const cardTitles = ["Card Payment", "UPI Payment"];

function MakePaymentPatinet() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [dues, setDues] = useState([]);
  const [defMsg, setDefMsg] = useState("");

  const [searchParams] = useSearchParams();
  const pemail = searchParams ? searchParams.get("pemail") : null;
  const demail = searchParams ? searchParams.get("demail") : null;
  const doa = searchParams ? searchParams.get("doa") : null;

  useEffect(() => {
    async function fetchUnpaid() {
      setOpenBackdrop(true);
      try {
        const token = localStorage.getItem("accessToken");
        const payload = token && jwt.decode(token);
        const ptemail = payload.userType === "patient" && payload.email;
        const res = await api.duePayment();
        if (res.data.error) {
          setOpenBackdrop(false);
          alert(res.data.errorMsg);
        } else {
          setOpenBackdrop(false);
          const myUnpaid = res.data.filter((unp) => unp.pemail === ptemail);
          setDues(myUnpaid);
          setDefMsg(
            myUnpaid.length === 0 &&
              "**All clear here. None of your payment is due.**"
          );
        }
      } catch (error) {
        setOpenBackdrop(false);
        alert(error.response.data.errorMsg);
        console.log(error);
      }
    }
    fetchUnpaid();
  }, []);

  if (pemail && demail && doa) {
    return (
      <Fragment>
        <PaymentContext.Provider value={{ pemail, demail, doa }}>
          <Dashboard cards={cardTitles} lgspace={6} />
        </PaymentContext.Provider>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Fragment>
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
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
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
              {defMsg}
            </Typography>
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
  }
}

export default MakePaymentPatinet;
