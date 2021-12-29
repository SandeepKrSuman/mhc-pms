import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ContactlessIcon from "@mui/icons-material/Contactless";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function AppointmentCard(props) {
  const navigate = useNavigate();
  function handlePayNow() {
    navigate({
      pathname: `/dashboard/patient/make-payment`,
      search: `?${createSearchParams({
        pemail: props.pemail,
        demail: props.demail,
        doa: props.doa,
      })}`,
    });
  }

  return (
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
            color="error"
            endIcon={<ContactlessIcon />}
            onClick={handlePayNow}
          >
            Pay Now
          </Button>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.7rem",
              fontStyle: "italic",
            }}
          >
            *Make payment to confirm your appointment
          </span>
        </CardActions>
      </CardContent>
    </Card>
  );
}
