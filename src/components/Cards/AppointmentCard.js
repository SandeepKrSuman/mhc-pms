import { Fragment, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../api";

export default function AppointmentCard(props) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
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

  const dateInPast = () => {
    const firstDate = new Date(parseInt(props.doa));
    const secondDate = new Date();
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };

  return (
    <Fragment>
      <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
        <CardContent>
          <br />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Appointment with
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
              color="error"
              endIcon={<CancelIcon />}
              onClick={handleCancel}
              disabled={dateInPast() ? true : false}
            >
              Cancel
            </Button>
          </CardActions>
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
