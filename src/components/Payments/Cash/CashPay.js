import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckIcon from "@mui/icons-material/Check";

function CashPay() {
  const [confirm, setConfirm] = useState(false);

  return (
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
          href="/downloadFiles/invoice1000.pdf"
          download="mhc-pms-payment-invoice"
          color="primary"
          variant="extended"
        >
          <FileDownloadIcon /> {" Invoice"}
        </Fab>
      ) : (
        <Fab
          color="primary"
          variant="extended"
          onClick={() => setConfirm(true)}
        >
          <CheckIcon /> {" Confirm"}
        </Fab>
      )}
    </Container>
  );
}

export default CashPay;
