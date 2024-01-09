import { useState, Fragment } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckIcon from "@mui/icons-material/Check";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../../api";
import { message } from "antd";

function CashPay() {
  const navigate = useNavigate();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [searchParams] = useSearchParams();
  const pemail = searchParams ? searchParams.get("pemail") : null;
  const demail = searchParams ? searchParams.get("demail") : null;
  const doa = searchParams ? searchParams.get("doa") : null;
  const [confirm, setConfirm] = useState(false);

  async function handleConfirm() {
    setOpenBackdrop(true);
    try {
      const res = await API.makePayment({ pemail, demail, doa });
      if (res.data.error) {
        setOpenBackdrop(false);
        message.error(res.data.errorMsg);
      } else {
        setOpenBackdrop(false);
        message.error(res.data.msg);
        setConfirm(true);
      }
    } catch (error) {
      setOpenBackdrop(false);
      message.error(error.response.data.errorMsg);
      console.error(error);
    }
  }

  function handleClick() {
    navigate("/signin");
  }

  return (
    <Fragment>
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          textAlign: "center",
          paddingTop: "20vh",
          paddingBottom: "3%",
        }}
      >
        <img alt="cash-rupee" src="/images/rupee-money.png" />
        <br /> <br />
        <Typography variant="body1" gutterBottom component="div">
          {confirm
            ? "Download the invoice."
            : "Confirm Payment after accepting cash."}
        </Typography>
        <br /> <br />
        {confirm ? (
          <Fab
            href="/downloadFiles/invoice-demo.pdf"
            download="mhc-pms-payment-invoice"
            color="primary"
            variant="extended"
            onClick={handleClick}
          >
            <FileDownloadIcon /> {" Invoice"}
          </Fab>
        ) : (
          <Fab color="primary" variant="extended" onClick={handleConfirm}>
            <CheckIcon /> {" Confirm"}
          </Fab>
        )}
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

export default CashPay;
