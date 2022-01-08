import { Fragment, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ContactlessIcon from "@mui/icons-material/Contactless";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, createSearchParams } from "react-router-dom";
import api from "../../api";

export default function AppointmentCard(props) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const navigate = useNavigate();
  function handlePayNow() {
    navigate({
      pathname: `/dashboard/${props.caller}/make-payment`,
      search: `?${createSearchParams({
        pemail: props.pemail,
        demail: props.demail,
        doa: props.doa,
      })}`,
    });
  }

  async function handleCancel() {
    setOpenBackdrop(true);
    try {
      const res = await api.cancelAppointment({
        data: { pemail: props.pemail, demail: props.demail, doa: props.doa },
      });
      if (res.data.error) {
        setOpenBackdrop(false);
        alert(res.data.erroMsg);
      } else {
        setOpenBackdrop(false);
        alert(res.data.msg);
        window.location.reload();
      }
    } catch (error) {
      setOpenBackdrop(false);
      alert(error.response.data.errorMsg);
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
        <CardContent>
          <br />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Payment Due for Appointment with
          </Typography>
          <Typography variant="h5" component="div">
            {props.doc}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`on ${props.date}`}
          </Typography>
          <br />
          <CardActions disableSpacing>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ContactlessIcon />}
              onClick={handlePayNow}
            >
              Pay Now
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DoNotDisturbIcon />}
              sx={{ marginLeft: "auto" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </CardActions>
          <span
            style={{
              fontSize: "0.7rem",
              fontStyle: "italic",
            }}
          >
            *Make payment to confirm appointment
          </span>
        </CardContent>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}
