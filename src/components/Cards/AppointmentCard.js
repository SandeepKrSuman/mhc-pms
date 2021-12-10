import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";

export default function AppointmentCard(props) {
  function handleCancel() {
    console.log("Appointment Cancelled!!");
  }

  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Your Appointment with
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
          >
            Cancel
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
